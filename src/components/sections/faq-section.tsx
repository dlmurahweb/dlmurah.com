import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RichText } from "@/components/ui/rich-text";
import type { FaqItem, HomePageContent } from "@/types/site";

export function FaqSection({
  faqs,
  homepage,
}: {
  faqs: FaqItem[];
  homepage: HomePageContent;
}) {
  return (
    <section id="faq" className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
        <div data-motion-reveal>
          <p className="text-xs font-extrabold tracking-[0.16em] text-brand-cyan uppercase">
            {homepage.faqEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,5vw,3.25rem)] leading-[1.03] font-bold tracking-[-0.045em] text-foreground">
            {homepage.faqHeading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-foreground-muted">
            {homepage.faqDescription}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="border-t border-border"
          data-motion-reveal
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger
                data-analytics-event="faq_interaction"
                data-source="faq"
                data-label={faq.question}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <RichText document={faq.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
