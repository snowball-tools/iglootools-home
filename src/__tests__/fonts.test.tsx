import React from "react";
import { render } from "@testing-library/react";
import { FontConfig, fonts } from "@/styles/fonts";

const FontComponent = ({ font }: { font: FontConfig }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="space-y-8 p-6 bg-white rounded-md shadow-lg w-3/4">
      <div key={font.name} className="space-y-4">
        <h1 className={`${font.className} text-4xl`}>
          {font.displayName} Sample Text
        </h1>
        <p className={`${font.className} text-lg`}>
          This is a paragraph in {font.displayName}.
        </p>
        <p className={`${font.className} font-bold text-lg`}>
          Bold text in {font.displayName}.
        </p>
        <span className={`${font.className} italic text-lg`}>
          Italic text in {font.displayName}.
        </span>
      </div>
    </div>
  </div>
);

describe("Test Fonts", () => {
  {
    fonts.map((font: FontConfig) => {
      describe(`${font.displayName} Font`, () => {
        it("has the correct class for regular text", () => {
          const { getByText } = render(FontComponent({ font }));

          const regularText = getByText(
            `This is a paragraph in ${font.displayName}.`
          );
          expect(regularText).toHaveClass(font.className);
        });

        it("has the correct class for bold text", () => {
          const { getByText } = render(FontComponent({ font }));

          const boldText = getByText(`Bold text in ${font.displayName}.`);

          // Check if the bold text has the right font and is bold
          expect(boldText).toHaveClass(font.className);
          expect(boldText).toHaveClass("font-bold");
        });

        it("has the correct class for italic text", () => {
          const { getByText } = render(FontComponent({ font }));

          const italicText = getByText(`Italic text in ${font.displayName}.`);
          expect(italicText).toHaveClass(font.className);
          expect(italicText).toHaveClass("italic");
        });
      });
    });
  }
});
