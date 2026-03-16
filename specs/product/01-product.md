---
title: "01 - Product"
---

# Product

The Product entity represents a product in the catalog. Products are scoped by domain and language.

## Fields

- name: string, required
- slug: string, required, unique per scope
- description: string, optional, multiline
- price: number, required, decimal
- sku: string, required, unique per scope
- publishedAt: date, optional
- isPublished: boolean, default false
- mainImage: DAM image, optional

## Relations

- category: ManyToOne to ProductCategory, optional (a product can optionally belong to one category)

## Enums

- productStatus: Draft, InReview, Published, Archived
- productType: Physical, Digital, Subscription

## Requirements

- The entity is scoped (domain + language).
- Slug must be validated for uniqueness within the scope.
- Price must be a positive number.
- SKU must match the format `[A-Z]{2,4}-[0-9]{4,8}` (e.g., "PROD-12345").

## API Validation

- Slug uniqueness must be validated server-side (mutation validation). Return a field-level error `SLUG_ALREADY_EXISTS` if a product with the same slug exists in the same scope.
- SKU uniqueness must be validated server-side. Return a field-level error `SKU_ALREADY_EXISTS`.

## DataGrid

Columns: mainImage as thumbnail, name, sku, category (show category name), productType as editable chip, price, productStatus as editable chip, publishedAt, isPublished.

The productStatus and productType chips are editable: clicking a chip opens a dropdown to change the value inline via a mutation.

The mainImage column is excluded from Excel export (block data is not exportable).

The grid should support search by name and sku, filtering by productStatus and productType, and Excel export.

## Form

All fields in a single form. Group into FieldSets:

- "General": name, slug, description
- "Details": sku, price, productType (SelectField), category (AsyncSelectField)
- "Publishing": productStatus (SelectField), publishedAt, isPublished
- "Media": mainImage

Field validations:

- price: must be positive (client-side validator)
- sku: must match format `[A-Z]{2,4}-[0-9]{4,8}` (client-side validator)

## Pages

Grid with edit on separate page (StackSwitch with grid, add, and edit pages). The grid toolbar includes an "Add Product" button that navigates to the add page. The entity toolbar shows the product name with the SKU as support text.

## Acceptance Criteria

- Products can be created, edited, deleted, and listed.
- Search finds products by name or SKU.
- Grid can be filtered by productStatus and productType.
- Grid data can be exported to Excel.
- Slug and SKU uniqueness are validated server-side and return field-level errors.
- Price and SKU format are validated client-side with inline error messages.
- The DAM image is shown as a thumbnail in the grid and with a preview in the form.
- productStatus and productType can be changed directly in the grid via editable chips.
