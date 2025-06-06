import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  BookA,
  User,
  ListCollapse,
  Quote,
  Palette,
  Search,
} from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pagine web",
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title("Articoli")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Articoli")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categorie",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authori",
        icon: User,
        S,
        context,
      }),
      S.listItem()
        .title("Colori del sito")
        .icon(Palette)
        .child(
          S.editor()
            .id("siteColorsSingleton")
            .schemaType("siteColors")
            .documentId("siteColorsSingleton")
            .title("Colori del sito")
        ),
      S.listItem()
        .title("Logo del sito")
        .icon(Palette)
        .child(
          S.editor()
            .id("siteLogoSingleton")
            .schemaType("siteLogo")
            .documentId("siteLogoSingleton")
            .title("Logo del sito")
        ),
      S.listItem()
        .title("SEO globale")
        .icon(Search)
        .child(
          S.editor()
            .id("seoSingleton")
            .schemaType("seo")
            .documentId("seoSingleton")
            .title("SEO globale")
        ),
    ]);

/*

      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),

*/
