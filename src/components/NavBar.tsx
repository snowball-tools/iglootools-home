import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 p-4 flex items-center">
      <a href="https://iglootools.xyz">
        <svg
          width="40"
          height="30"
          viewBox="0 0 40 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.4491 3.01255C16.6838 3.17512 19.1882 5.49276 21.4985 7.76246C23.8381 10.0609 26.3033 12.5367 26.4776 15.8118C26.6588 19.216 24.9135 22.4595 22.4036 24.7663C19.9926 26.9822 16.7225 27.6939 13.4491 27.7861C10.0552 27.8818 6.31407 27.747 3.97539 25.2856C1.66895 22.8581 1.96764 19.1587 2.07191 15.8118C2.17161 12.6118 2.42086 9.30345 4.54789 6.91057C6.785 4.39384 10.0861 2.84353 13.4491 3.01255Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.4491 3.01255C16.6838 3.17512 19.1882 5.49276 21.4985 7.76246C23.8381 10.0609 26.3033 12.5367 26.4776 15.8118C26.6588 19.216 24.9135 22.4595 22.4036 24.7663C19.9926 26.9822 16.7225 27.6939 13.4491 27.7861C10.0552 27.8818 6.31407 27.747 3.97539 25.2856C1.66895 22.8581 1.96764 19.1587 2.07191 15.8118C2.17161 12.6118 2.42086 9.30345 4.54789 6.91057C6.785 4.39384 10.0861 2.84353 13.4491 3.01255Z"
              fill="white"
              stroke="url(#paint0_linear_105_3)"
              stroke-width="1.39238"
            />
          </g>
          <g opacity="0.2">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.285 3.01255C19.5196 3.17512 22.024 5.49276 24.3344 7.76247C26.674 10.061 29.1391 12.5367 29.3134 15.8118C29.4947 19.216 27.7494 22.4595 25.2395 24.7663C22.8285 26.9822 19.5583 27.6939 16.285 27.7861C12.8911 27.8818 9.14993 27.747 6.81125 25.2856C4.50481 22.8581 4.8035 19.1587 4.90777 15.8118C5.00748 12.6118 5.25672 9.30345 7.38375 6.91057C9.62086 4.39384 12.922 2.84354 16.285 3.01255Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.285 3.01255C19.5196 3.17512 22.024 5.49276 24.3344 7.76247C26.674 10.061 29.1391 12.5367 29.3134 15.8118C29.4947 19.216 27.7494 22.4595 25.2395 24.7663C22.8285 26.9822 19.5583 27.6939 16.285 27.7861C12.8911 27.8818 9.14993 27.747 6.81125 25.2856C4.50481 22.8581 4.8035 19.1587 4.90777 15.8118C5.00748 12.6118 5.25672 9.30345 7.38375 6.91057C9.62086 4.39384 12.922 2.84354 16.285 3.01255Z"
              fill="white"
              stroke="url(#paint1_linear_105_3)"
              stroke-width="1.39238"
            />
          </g>
          <g opacity="0.5">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.1219 3.01256C23.3565 3.17512 25.8609 5.49276 28.1712 7.76247C30.5109 10.061 32.976 12.5367 33.1503 15.8118C33.3315 19.216 31.5863 22.4595 29.0764 24.7663C26.6654 26.9822 23.3952 27.6939 20.1219 27.7861C16.7279 27.8818 12.9868 27.747 10.6481 25.2856C8.34169 22.8581 8.64037 19.1587 8.74465 15.8118C8.84435 12.6118 9.09359 9.30345 11.2206 6.91057C13.4577 4.39384 16.7589 2.84354 20.1219 3.01256Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.1219 3.01256C23.3565 3.17512 25.8609 5.49276 28.1712 7.76247C30.5109 10.061 32.976 12.5367 33.1503 15.8118C33.3315 19.216 31.5863 22.4595 29.0764 24.7663C26.6654 26.9822 23.3952 27.6939 20.1219 27.7861C16.7279 27.8818 12.9868 27.747 10.6481 25.2856C8.34169 22.8581 8.64037 19.1587 8.74465 15.8118C8.84435 12.6118 9.09359 9.30345 11.2206 6.91057C13.4577 4.39384 16.7589 2.84354 20.1219 3.01256Z"
              fill="white"
              stroke="url(#paint2_linear_105_3)"
              stroke-width="1.39238"
            />
          </g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.9586 3.01256C27.1933 3.17512 29.6977 5.49276 32.008 7.76247C34.3476 10.061 36.8128 12.5367 36.9871 15.8118C37.1683 19.216 35.423 22.4595 32.9131 24.7663C30.5021 26.9822 27.232 27.6939 23.9586 27.7861C20.5647 27.8818 16.8236 27.747 14.4849 25.2856C12.1785 22.8581 12.4771 19.1587 12.5814 15.8118C12.6811 12.6118 12.9304 9.30345 15.0574 6.91057C17.2945 4.39384 20.5956 2.84354 23.9586 3.01256Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.9586 3.01256C27.1933 3.17512 29.6977 5.49276 32.008 7.76247C34.3476 10.061 36.8128 12.5367 36.9871 15.8118C37.1683 19.216 35.423 22.4595 32.9131 24.7663C30.5021 26.9822 27.232 27.6939 23.9586 27.7861C20.5647 27.8818 16.8236 27.747 14.4849 25.2856C12.1785 22.8581 12.4771 19.1587 12.5814 15.8118C12.6811 12.6118 12.9304 9.30345 15.0574 6.91057C17.2945 4.39384 20.5956 2.84354 23.9586 3.01256Z"
            fill="white"
            stroke="url(#paint3_linear_105_3)"
            stroke-width="1.39238"
          />
          <defs>
            <linearGradient
              id="paint0_linear_105_3"
              x1="14.2452"
              y1="3"
              x2="14.2452"
              y2="27.8071"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.354167" stop-color="#8AB9F0" />
              <stop offset="1" stop-color="#3E96FD" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_105_3"
              x1="17.0811"
              y1="3"
              x2="17.0811"
              y2="27.8071"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.354167" stop-color="#8AB9F0" />
              <stop offset="1" stop-color="#3E96FD" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_105_3"
              x1="20.918"
              y1="3"
              x2="20.918"
              y2="27.8071"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.354167" stop-color="#8AB9F0" />
              <stop offset="1" stop-color="#3E96FD" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_105_3"
              x1="24.7547"
              y1="3"
              x2="24.7547"
              y2="27.8071"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.354167" stop-color="#8AB9F0" />
              <stop offset="1" stop-color="#3E96FD" />
            </linearGradient>
          </defs>
        </svg>
      </a>
      <div className="flex flex-grow justify-end">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            Menu
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                >
                  Option 1
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                >
                  Option 2
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                >
                  Option 3
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
