import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "Society for Good Health",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Used as the default meta description for SEO.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "aboutContent",
      title: "About Page Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text shown on the About page.",
    }),
    defineField({
      name: "researchAreas",
      title: "Research Areas",
      type: "array",
      description:
        "Shown on the Research page as a list. Add sub-items for nested points (e.g. 'Environmental health' → 'Domestic cooking fuels').",
      of: [
        {
          type: "object",
          name: "researchArea",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subItems",
              title: "Sub-items",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "contactDetails",
      title: "Contact Details",
      type: "array",
      description:
        "Shown on the Contact page, in the order you add them (e.g. Phone, Fax, Address).",
      of: [
        {
          type: "object",
          name: "contactDetail",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isLink",
              title: "Render as tappable link (tel:/mailto:)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Homepage Testimonial",
      type: "object",
      description: "A quote shown in the homepage story section.",
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "authorName",
          title: "Author Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "authorRole",
          title: "Author Role",
          type: "string",
          description: 'e.g. "Community Health Volunteer, Ibadan"',
        }),
        defineField({
          name: "photo",
          title: "Photo",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      description: "Static footer links only — no embedded widgets.",
      fields: [
        defineField({
          name: "x",
          title: "X (Twitter) URL",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
