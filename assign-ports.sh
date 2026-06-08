#!/bin/bash
# Assigns unique ports so multiple instances of this project can run in parallel.
# Prefers the base ports (no offset) and only falls back to an offset when those are taken.

set -euo pipefail

if [ ! -f ".env" ]; then
    echo "Error: No .env file found in $PWD" >&2
    exit 1
fi

# Read all *_PORT entries from .env
declare -a PORT_NAMES=()
declare -a BASE_PORTS=()
while IFS='=' read -r key value; do
    PORT_NAMES+=("$key")
    BASE_PORTS+=("$value")
done < <(grep -E '^[A-Z_]+_PORT=[0-9]+$' .env)

if [ ${#BASE_PORTS[@]} -eq 0 ]; then
    echo "Error: No *_PORT entries found in .env" >&2
    exit 1
fi

port_is_free() {
    ! lsof -iTCP:"$1" -sTCP:LISTEN -t >/dev/null 2>&1
}

CONFLICT_NAME=""
CONFLICT_PORT=""
all_ports_free() {
    local offset=$1
    for i in "${!BASE_PORTS[@]}"; do
        local port=$((BASE_PORTS[i] + offset))
        if ! port_is_free "$port"; then
            CONFLICT_NAME="${PORT_NAMES[$i]}"
            CONFLICT_PORT="$port"
            return 1
        fi
    done
    return 0
}

# Prefer no offset (base ports); fall back to +100, +200, ..., +900 if those are taken
PORT_OFFSET=""
for candidate in $(seq 0 100 900); do
    if all_ports_free "$candidate"; then
        PORT_OFFSET=$candidate
        break
    fi
    echo "Offset +$candidate has a port conflict (${CONFLICT_NAME}=${CONFLICT_PORT} in use), trying next..." >&2
done

if [ -z "$PORT_OFFSET" ]; then
    echo "Error: Could not find a free port offset (tried 0-900)" >&2
    exit 1
fi

# Remove any existing port assignments from .env.local first to avoid duplicates/stale offsets.
# Single portable pass (works with both GNU and BSD tools, unlike `sed -i ''`).
if [ -f .env.local ]; then
    names_pattern="^($(IFS='|'; echo "${PORT_NAMES[*]}"))="
    grep -Ev "$names_pattern" .env.local > .env.local.tmp || true
    mv .env.local.tmp .env.local
fi

if [ "$PORT_OFFSET" -eq 0 ]; then
    # Base ports are free: leave .env.local without port overrides so the .env defaults apply
    echo "All base ports are free, using no offset (.env defaults apply)" >&2
else
    # Write offset ports to .env.local (leaves .env unchanged)
    {
        for i in "${!PORT_NAMES[@]}"; do
            name="${PORT_NAMES[$i]}"
            base="${BASE_PORTS[$i]}"
            echo "${name}=$((base + PORT_OFFSET))"
        done
    } >> .env.local
    echo "Ports offset by +$PORT_OFFSET written to .env.local" >&2
fi
