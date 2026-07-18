"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import styles from "./accordion.module.css";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex min-h-14 flex-1 items-center justify-between gap-4 border border-transparent px-5 py-4 text-left font-heading text-base font-bold text-foreground transition-colors outline-none hover:text-brand-ice focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-brand-cyan sm:px-6",
          styles.trigger,
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={cn(
            "pointer-events-none shrink-0 transition-transform duration-[240ms] ease-[var(--ease-out-quart)] motion-reduce:transition-none",
            styles.icon,
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "grid grid-rows-[0fr] overflow-hidden text-sm opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 motion-reduce:animate-none",
        styles.content,
      )}
      {...props}
    >
      <div
        data-slot="accordion-content-clip"
        className="min-h-0 overflow-hidden"
      >
        <div
          data-slot="accordion-content-body"
          className={cn(
            "px-5 pt-2 pb-6 leading-7 text-foreground-muted sm:px-6 sm:pt-2.5 sm:pb-7 [&_a]:text-brand-cyan [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-brand-ice [&_p:not(:last-child)]:mb-4",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
