---
title: "04 - Product Review"
---

# Product Review

The ProductReview entity represents a customer review for a product. Reviews are global (not scoped) and reference a Product via a relation.

## Fields

- title: string, required
- body: string, required, multiline
- rating: Rating enum (One, Two, Three, Four, Five), required
- reviewerName: string, required
- reviewedAt: datetime, required
- isApproved: boolean, default false

## Relations

- product: ManyToOne to Product, required

## Requirements

- The entity is **not scoped** (reviews are global across all domains/languages).
- Reviews reference a Product.
- The product relation should be filterable in the grid.
- Rating is a GraphQL enum (One, Two, Three, Four, Five).

## DataGrid

Standard paginated grid.

Columns: title, rating, reviewerName, product (show product name), reviewedAt, isApproved, domain, language (scope columns derived from the related product).

The grid should support search by title and reviewerName, filtering by product (relation filter) and isApproved, and Excel export.

The DataGrid accepts an optional `productId` prop to filter reviews by a specific product. This allows reuse on the Product detail page.

## Form

Since the form is simple, use an **edit dialog** (no separate edit page). Clicking a row or the add button opens a dialog overlay.

Fields in the dialog: product (AsyncAutocompleteField, at the top), title, body, rating (SelectField dropdown), reviewerName, reviewedAt, isApproved.

The product field is placed at the very top of the form so users pick the product first.

## Pages

Grid with dialog-based edit — the grid and the edit dialog live on the same page. No StackSwitch needed. The dialog opens for both adding and editing.

Use `ContentScopeIndicator global` since the entity is unscoped.

## Product Detail Integration

The Product edit page includes a "Reviews" tab that shows a filtered view of reviews for that specific product. The same `ProductReviewsDataGrid` component is reused with a `productId` filter. Reviews can be added and edited via the same edit dialog pattern.

## Acceptance Criteria

- Reviews can be created, edited, deleted, and listed.
- Reviews are edited in a dialog overlay, not on a separate page.
- The grid can be filtered by product (relation filter with autocomplete).
- Grid data can be exported to Excel.
- The product name is displayed in the grid.
- The product's domain and language (scope) are displayed in the grid.
- Rating is selected via a dropdown (enum: One through Five).
- The entity is unscoped — no content scope selection affects the review list.
- The Product edit page has a "Reviews" tab showing reviews filtered by that product.
