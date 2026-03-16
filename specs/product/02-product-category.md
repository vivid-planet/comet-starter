---
title: "02 - Product Category"
---

# Product Category

The ProductCategory entity represents a hierarchical category for organizing products. Categories can be nested via a self-referencing parent relation and are manually ordered.

## Fields

- name: string, required
- slug: string, required, unique per scope
- position: number (for manual ordering)

## Relations

- parentCategory: ManyToOne to ProductCategory, optional (top-level categories have no parent)
- products: OneToMany from Product (a product can optionally belong to one category)

## Requirements

- The entity is scoped (domain + language).
- Categories are ordered by position (drag-and-drop reordering in the grid).
- Categories can be nested: a category can have a parent category.

## DataGrid

Non-paginated grid (all categories loaded at once) with drag-and-drop row reordering.

Columns: name, slug, parentCategory (show parent name).

No search or filter — the dataset is small enough to display in full.

## Form

All fields. Group into one FieldSet:

- "General": name, slug, parentCategory (AsyncSelectField)

## Pages

Grid with edit page. The entity toolbar shows the category name.

## Acceptance Criteria

- Categories can be created, edited, deleted, and reordered via drag-and-drop.
- A category can optionally reference a parent category.
- Position ordering persists across page reloads.
- Slug uniqueness is enforced within the scope.
