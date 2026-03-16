---
title: "03 - Product Variant"
---

# Product Variant

The ProductVariant entity represents a specific variant of a Product (e.g., size, color). Variants are managed as sub-entities within the Product edit page.

## Fields

- name: string, required
- sku: string, required
- price: number, required, decimal
- stock: number, required, integer, default 0
- isAvailable: boolean, default true
- image: file upload, optional

## Enums

- variantStatus: Active, OutOfStock, Discontinued

## Relations

- product: ManyToOne to Product, required (parent entity)

## Requirements

- The entity is scoped via its parent Product (`@ScopedEntity` deriving scope from product relation).
- Variants are sub-entities of Product — they are always viewed in the context of a specific product.
- The variantStatus should be editable inline in the grid via an editable chip.
- SKU must be unique within the same product.
- Stock must not be negative.

## API Validation

- SKU uniqueness must be validated server-side within the parent product. Return a field-level error `SKU_ALREADY_EXISTS` if another variant of the same product has the same SKU.

## DataGrid

Sub-entity grid filtered by the parent product ID.

Columns: image as thumbnail, name, sku, price, stock, variantStatus as editable chip, isAvailable.

The grid should support search by name and sku.

## Form

All fields except product (implicitly set from parent). Group into FieldSets:

- "General": name, sku, variantStatus (SelectField)
- "Pricing & Stock": price, stock, isAvailable
- "Media": image

Field validations:

- price: must be positive (client-side validator)
- stock: must be zero or positive integer (client-side validator)

## Pages

The ProductVariant grid and form are embedded as a RouterTab ("Variants") within the Product edit page. The variant edit uses a nested StackSwitch inside the tab. The variant edit page shows the variant name in the entity toolbar.

## Products DataGrid Integration

The Products DataGrid shows a `variantCount` column displaying the number of variants per product in a grey Chip.

## Acceptance Criteria

- Variants are only accessible from within the Product edit page.
- The variant grid only shows variants belonging to the current product.
- variantStatus can be changed inline from the grid via an editable chip (no need to open the form).
- A new RouterTab "Variants" appears on the Product edit page alongside the existing Product form tab.
- SKU uniqueness within the product is enforced server-side with a field-level error.
- Price and stock are validated client-side with inline error messages.
- The Products DataGrid shows the variant count per product in a grey Chip column.
