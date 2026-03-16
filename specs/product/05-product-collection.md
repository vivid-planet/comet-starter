---
title: "05 - Product Collection"
---

# Product Collection

The ProductCollection entity represents a curated group of products (e.g., "Summer Sale", "New Arrivals"). Collections have metadata and a ManyToMany relation to products.

## Fields

- name: string, required
- slug: string, required, unique per scope
- description: string, optional, multiline
- validFrom: datetime, optional
- validTo: datetime, optional
- isActive: boolean, default false

## Enums

- collectionType: Manual, Seasonal, Featured, Sale

## Relations

- products: ManyToMany to Product

## Requirements

- The entity is scoped (domain + language).
- Collections reference multiple products via a ManyToMany relation.
- validTo must be after validFrom (when both are set).
- The collectionType determines the visual treatment — show it as a colored chip.

## DataGrid

Standard paginated grid.

Columns: name, collectionType as chip, product count (number of associated products), validFrom, validTo, isActive.

The grid should support search by name and filtering by collectionType and isActive.

## Form

The edit page uses RouterTabs:

- Tab "General": the entity form
- Tab "Products": a checkbox selection grid (multi-select) for associating products with this collection

The "General" tab groups fields into FieldSets:

- "General": name, slug, description
- "Settings": collectionType, isActive
- "Validity": validFrom, validTo

The "Products" tab has two parts:

1. **Selected Products Grid** — Shows only the currently associated products in a read-only DataGrid. Each row has an edit icon (`RouterLink` for cross-entity navigation to the product's edit page) and a "remove" action (`RemoveIcon` — the product is only unlinked from the collection, not deleted). The toolbar contains a "Select Products" button (using the `Select` icon from `@comet/admin-icons`) that opens a selection dialog.

2. **Select Products Dialog** — A modal dialog (Comet `Dialog` with `title` prop) opened via the "Select Products" button. It shows a paginated DataGrid of all available products with checkbox selection. The DataGrid is placed directly in the dialog (no `DialogContent` wrapper) to avoid padding. The dialog toolbar has search and filter (`GridFilterButton`). Pre-selected products (already associated) are checked. The user selects/deselects products and confirms with a save action. The cancel button uses `variant="textDark"` — never two primary buttons in a dialog. Selections are preserved across pages (when paginating through available products in the dialog).

## Pages

Grid with edit on separate page (StackSwitch with grid, add, and edit pages). The edit page uses RouterTabs for "General" (form) and "Products" (checkbox selection grid).

The entity toolbar shows the collection name with the collectionType as support text.

## Acceptance Criteria

- Collections can be created, edited, deleted, and listed.
- The "Products" tab shows a grid of currently selected products with a "Select Products" toolbar button.
- Clicking "Select Products" opens a modal dialog with a paginated, searchable, filterable DataGrid of all products with checkbox selection.
- Pre-selected products are checked in the dialog; selections are preserved across pages within the dialog.
- Confirming the dialog persists selected products as the collection's ManyToMany relation.
- The product count is displayed in the main grid.
- collectionType is displayed as a colored chip in the grid.
- Slug uniqueness is enforced within the scope.
