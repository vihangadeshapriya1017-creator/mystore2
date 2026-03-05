"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Noise‑Canceling Headphones",
    badge: "Best Seller",
    price: "Rs. 8,499",
    originalPrice: "Rs. 10,999",
    discount: "-23%",
    rating: 4.8,
    reviews: 312,
    color: "from-indigo-500 via-sky-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    badge: "Hot",
    price: "Rs. 5,299",
    originalPrice: "Rs. 6,999",
    discount: "-24%",
    rating: 4.6,
    reviews: 189,
    color: "from-rose-500 via-orange-400 to-amber-300",
  },
  {
    id: 3,
    name: "Lightweight Running Sneakers",
    badge: "New",
    price: "Rs. 3,799",
    originalPrice: "Rs. 4,499",
    discount: "-16%",
    rating: 4.5,
    reviews: 98,
    color: "from-emerald-500 via-teal-500 to-sky-400",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    badge: "Featured",
    price: "Rs. 12,999",
    originalPrice: "Rs. 15,999",
    discount: "-19%",
    rating: 4.7,
    reviews: 67,
    color: "from-slate-800 via-slate-700 to-slate-500",
  },
  {
    id: 5,
    name: '4K Ultra HD Smart TV 43"',
    badge: "Limited",
    price: "Rs. 46,499",
    originalPrice: "Rs. 52,999",
    discount: "-12%",
    rating: 4.4,
    reviews: 143,
    color: "from-purple-600 via-violet-500 to-fuchsia-500",
  },
  {
    id: 6,
    name: "Premium Cotton Hoodie",
    badge: "Trending",
    price: "Rs. 2,199",
    originalPrice: "Rs. 2,799",
    discount: "-21%",
    rating: 4.3,
    reviews: 210,
    color: "from-amber-500 via-yellow-400 to-lime-300",
  },
  {
    id: 7,
    name: "Bluetooth Portable Speaker",
    badge: "Top Rated",
    price: "Rs. 1,999",
    originalPrice: "Rs. 2,499",
    discount: "-20%",
    rating: 4.9,
    reviews: 402,
    color: "from-cyan-500 via-sky-500 to-blue-500",
  },
  {
    id: 8,
    name: "Professional DSLR Camera",
    badge: "Mega Deal",
    price: "Rs. 82,499",
    originalPrice: "Rs. 94,999",
    discount: "-13%",
    rating: 4.6,
    reviews: 54,
    color: "from-neutral-900 via-zinc-800 to-zinc-600",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }, [search]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = search.trim();
    if (!term) {
      setLastMessage("Showing all products.");
      return;
    }
    setLastMessage(`Showing results for "${term}".`);
  };

  const handleLoginClick = () => {
    setAuthMode("login");
    setShowLoginModal(true);
    setLastMessage(null);
  };

  const handleCartClick = () => {
    setLastMessage("Your cart is empty. Add some products to get started.");
  };

  const handleAddToCart = (productName: string) => {
    setLastMessage(`"${productName}" added to cart (demo).`);
  };

  useEffect(() => {
    if (!showLoginModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowLoginModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLoginModal]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 via-rose-500 to-fuchsia-500 text-xs font-semibold text-white shadow-md shadow-orange-500/40">
              MS
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold tracking-tight">
                MyStore
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Everyday deals, Daraz-style
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden flex-1 items-center sm:flex">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full items-center rounded-full border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-sm shadow-sm ring-orange-500/0 transition hover:border-slate-300 hover:bg-white focus-within:ring-2 focus-within:ring-orange-500/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
            >
              <input
                type="text"
                placeholder="Search for phones, fashion, electronics and more..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mr-2 w-full bg-transparent text-xs outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 sm:text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-orange-500/40 hover:brightness-110 sm:text-sm"
              >
                Search
              </button>
            </form>
          </div>

          {/* Actions */}
          <nav className="ml-auto flex items-center gap-2 text-xs sm:text-sm">
            <button
              onClick={handleLoginClick}
              className="hidden rounded-full px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            >
              Login
            </button>
            <button
              onClick={handleCartClick}
              className="inline-flex items-center gap-1 rounded-full border border-orange-500/70 bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm hover:bg-orange-50 dark:border-orange-400/80 dark:bg-slate-950 dark:text-orange-300 dark:hover:bg-slate-900 sm:text-sm"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Cart
            </button>
          </nav>
        </div>

        {/* Secondary nav */}
        <div className="border-t border-slate-100/70 bg-white/70 px-4 py-2 text-xs text-slate-600 backdrop-blur-md dark:border-slate-900/80 dark:bg-slate-950/80 dark:text-slate-400 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 sm:gap-4">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
              Flash Sale
            </span>
            <button className="rounded-full px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-900">
              Electronics
            </button>
            <button className="rounded-full px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-900">
              Fashion
            </button>
            <button className="rounded-full px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-900">
              Home & Living
            </button>
            <button className="rounded-full px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-900">
              Beauty
            </button>
            <button className="rounded-full px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-900">
              Groceries
            </button>
            <button className="ml-auto hidden rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 sm:inline-flex">
              Become a seller
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pb-16 lg:pt-8">
        {/* Hero section */}
        <section className="mb-10 grid gap-6 md:grid-cols-[1.6fr,1fr]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 px-6 py-7 text-white shadow-xl sm:px-8 sm:py-10">
            <div className="relative z-10 max-w-xl space-y-4 sm:space-y-5">
              <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-orange-100 backdrop-blur">
                Daraz‑style Mega Sale
              </p>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Discover top deals on everything you love.
              </h1>
              <p className="max-w-md text-sm text-orange-50/90 sm:text-base">
                Shop electronics, fashion, home & more with fast delivery,
                secure payments and exclusive app‑only discounts.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
                <button className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-orange-600 shadow-sm shadow-orange-500/30 transition hover:bg-orange-50 sm:text-sm">
                  Start shopping
                </button>
                <button className="inline-flex items-center rounded-full border border-white/60 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:text-sm">
                  View flash sale
                </button>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-orange-50/90 sm:text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Trusted sellers
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                  Easy returns
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  Secure checkout
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 right-6 h-40 w-40 rounded-full bg-purple-400/30 blur-3xl" />
          </div>

          {/* Side banner */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="flex flex-col justify-between rounded-3xl border border-dashed border-slate-200 bg-white px-5 py-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-orange-500">
                  Flash sale
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Up to 50% off on top brands
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Limited‑time offers, updated every hour. Don&apos;t miss out.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="inline-flex h-7 items-center justify-center rounded-full bg-slate-900 px-2.5 text-[11px] font-semibold tracking-wide text-white dark:bg-slate-100 dark:text-slate-900">
                  02:14:08
                </span>
                <span>left on today&apos;s deals</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-5 py-4 text-slate-50 shadow-md">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                New user bonus
              </p>
              <p className="mt-1 text-sm font-semibold">
                Get extra Rs. 500 off on your first order.
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Apply code <span className="font-semibold">MYSTORE500</span> at
                checkout.
              </p>
            </div>
          </div>
        </section>

        {/* Product filters / heading */}
        <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Featured products
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {search.trim()
                ? `Results for "${search.trim()}" (${filteredProducts.length} item${
                    filteredProducts.length === 1 ? "" : "s"
                  }).`
                : "Curated picks inspired by Daraz home page."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded-full bg-slate-900 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              All
            </button>
            <button className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              Most popular
            </button>
            <button className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              New arrivals
            </button>
            <button className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              Best rated
            </button>
          </div>
        </section>

        {/* Product grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 sm:px-6">
              <p className="font-medium text-slate-700 dark:text-slate-200">
                No products found.
              </p>
              <p className="mt-1 text-xs">
                Try searching with a different keyword or clear your search to
                see all products again.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
              >
                <div className="relative">
                  <div
                    className={`h-40 w-full bg-gradient-to-br ${product.color} transition duration-300 group-hover:scale-[1.02]`}
                  >
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-xs font-semibold text-slate-900 shadow-md shadow-slate-900/10">
                        <span className="line-clamp-2 text-center">
                          {product.name.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm shadow-orange-500/40">
                    {product.badge}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                    {product.discount}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-1 px-3.5 pb-3.5 pt-3 text-sm">
                  <h3 className="line-clamp-2 text-[13px] font-medium text-slate-900 group-hover:text-orange-600 dark:text-slate-50 dark:group-hover:text-orange-300">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-semibold text-orange-600 dark:text-orange-300">
                      {product.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {product.rating.toFixed(1)} rating
                    </span>
                    <span>{product.reviews} reviews</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.name)}
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition group-hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Bottom banner */}
        <section className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 sm:px-6 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Why shop with MyStore
              </p>
              <p className="text-xs sm:text-sm">
                Fast delivery, secure payments and a Daraz‑inspired shopping
                experience, tuned for your brand.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                100% authentic products
              </span>
              <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                Buyer protection
              </span>
              <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                Dedicated support
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Login modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/95 text-slate-50 shadow-2xl shadow-slate-900/70 ring-1 ring-slate-700/80 dark:bg-slate-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 px-5 py-4 text-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-orange-100">
                {authMode === "login" ? "Welcome back" : "Join MyStore"}
              </p>
              <p className="mt-1 text-base font-semibold tracking-tight text-white">
                {authMode === "login"
                  ? "Login to continue shopping"
                  : "Create your account in seconds"}
              </p>
            </div>

            <form
              className="space-y-4 px-5 py-5 text-sm"
              onSubmit={(event) => {
                event.preventDefault();
                setShowLoginModal(false);
                setLastMessage(
                  authMode === "login"
                    ? "Logged in successfully (demo). Enjoy shopping!"
                    : "Account created successfully (demo). Welcome to MyStore!"
                );
              }}
            >
              {authMode === "register" && (
                <div className="space-y-1">
                  <label
                    htmlFor="signup-name"
                    className="text-xs font-medium text-slate-300"
                  >
                    Full name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/70"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label
                  htmlFor="auth-email"
                  className="text-xs font-medium text-slate-300"
                >
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/70"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="auth-password"
                    className="font-medium text-slate-300"
                  >
                    Password
                  </label>
                  {authMode === "login" && (
                    <button
                      type="button"
                      className="text-[11px] font-medium text-orange-300 underline-offset-2 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  id="auth-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/70"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/40 transition hover:brightness-110"
              >
                {authMode === "login" ? "Continue" : "Create account"}
              </button>

              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="mt-1 flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-900"
              >
                Cancel
              </button>

              <div className="pt-1 text-center text-[11px] text-slate-500">
                <p>
                  By continuing, you agree to MyStore&apos;s{" "}
                  <span className="cursor-pointer text-slate-300 underline-offset-2 hover:underline">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="cursor-pointer text-slate-300 underline-offset-2 hover:underline">
                    Privacy Policy
                  </span>
                  .
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-100 underline-offset-2 hover:bg-slate-800"
                >
                  {authMode === "login"
                    ? "New here? Create account"
                    : "Already have an account? Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple bottom popup / toast */}
      {lastMessage && (
        <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
          <div className="flex max-w-md items-center gap-3 rounded-full bg-slate-900 px-4 py-2 text-xs text-slate-50 shadow-lg shadow-slate-900/40 ring-1 ring-slate-700/60 dark:bg-slate-100 dark:text-slate-900 dark:shadow-slate-100/40 dark:ring-slate-300/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="flex-1 sm:text-sm">{lastMessage}</p>
            <button
              onClick={() => setLastMessage(null)}
              className="text-[11px] font-medium text-slate-200 underline-offset-2 hover:underline dark:text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

