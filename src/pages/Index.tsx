import { useEffect, useMemo, useRef } from "react";
import heroImg from "@/assets/hero-food.jpg";
import imgNasi from "@/assets/prod-nasi-goreng.jpg";
import imgSate from "@/assets/prod-sate-ayam.jpg";
import imgRendang from "@/assets/prod-rendang.jpg";
import imgGado from "@/assets/prod-gado-gado.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Truck, ShieldCheck, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const products = [
  {
    id: "nasi-goreng",
    name: "Nasi Goreng Spesial",
    price: 35000,
    rating: 4.8,
    image: imgNasi,
  },
  {
    id: "sate-ayam",
    name: "Sate Ayam Madura",
    price: 30000,
    rating: 4.7,
    image: imgSate,
  },
  {
    id: "rendang",
    name: "Rendang Sapi Premium",
    price: 55000,
    rating: 4.9,
    image: imgRendang,
  },
  {
    id: "gado-gado",
    name: "Gado-Gado Jakarta",
    price: 28000,
    rating: 4.6,
    image: imgGado,
  },
];

function formatCurrency(idr: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(idr);
}

const Feature = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 ring-1 ring-border">
    <div className="rounded-md p-2 bg-brand/10 text-brand">
      <Icon className="size-5" />
    </div>
    <div>
      <p className="font-semibold tracking-tight">{title}</p>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);

const Index = () => {
  // Signature interaction: subtle spotlight following cursor
  const spotlightRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const jsonLd = useMemo(() => {
    const items = products.map((p, idx) => ({
      '@type': 'Product',
      name: p.name,
      image: `${window.location.origin}${(p.image as string).replace(/^\//, '')}`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: p.price,
        availability: 'http://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating,
        reviewCount: Math.round(120 + idx * 13)
      }
    }));
    return JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items }, null, 2);
  }, []);

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="inline-block h-2 w-2 rounded-full bg-brand mr-1" aria-hidden />
            MakanKuy
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#menu" className="text-muted-foreground hover:text-foreground transition-colors">Menu</a>
            <a href="#keunggulan" className="text-muted-foreground hover:text-foreground transition-colors">Keunggulan</a>
            <a href="#promo" className="text-muted-foreground hover:text-foreground transition-colors">Promo</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Masuk</Button>
            <Button variant="brand" size="sm"><ShoppingCart className="mr-1" /> Pesan</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section ref={spotlightRef} className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: "radial-gradient(600px circle at var(--x,50%) var(--y,40%), hsl(var(--brand)/0.22), transparent 60%)",
            }}
            aria-hidden
          />

          <div className="container grid lg:grid-cols-2 gap-10 py-12 lg:py-20 items-center">
            <div>
              <Badge className="mb-4 bg-brand/15 text-brand ring-1 ring-brand/20">100% Halal & Fresh</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Belanja Makanan Online – Fresh & Lezat
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-prose">
                Menu autentik Indonesia, dimasak dengan bahan terbaik, dikirim cepat ke depan pintu Anda.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" size="xl"><ShoppingCart /> Mulai Belanja</Button>
                <Button variant="outline" size="lg">Lihat Menu</Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                <Feature icon={Truck} title="Antar Cepat" desc="< 30 menit" />
                <Feature icon={ShieldCheck} title="Higienis" desc="Standar tinggi" />
                <Feature icon={Clock} title="Selalu Segar" desc="Masak saat pesan" />
              </div>
            </div>
            <div className="relative group">
              <img
                src={heroImg}
                alt="Hero makanan Indonesia untuk e-commerce makanan"
                className="w-full h-auto rounded-xl ring-1 ring-border shadow-[var(--shadow-soft)] object-cover"
                loading="eager"
              />
              <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: "var(--gradient-brand)" }}
                   aria-hidden />
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="menu" className="container py-12 lg:py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Menu Favorit</h2>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Lihat semua</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="group overflow-hidden ring-1 ring-border hover:shadow-[var(--shadow-soft)] transition-shadow">
                <CardHeader className="p-0">
                  <img
                    src={p.image}
                    alt={`Foto produk ${p.name}`}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <p className="font-semibold leading-tight">{p.name}</p>
                  <div className="mt-1 flex items-center gap-1 text-brand">
                    <Star className="size-4 fill-current" />
                    <span className="text-sm text-muted-foreground">{p.rating.toFixed(1)}</span>
                  </div>
                  <p className="mt-3 text-lg font-bold">{formatCurrency(p.price)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="brand"
                    className="w-full"
                    onClick={() => toast({ title: "Ditambahkan ke keranjang", description: `${p.name} berhasil ditambahkan.` })}
                  >
                    <ShoppingCart className="mr-2" /> Tambah
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Promo banner */}
        <section id="promo" className="py-12">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-border p-8 md:p-10"
                 style={{ background: "var(--gradient-brand)" }}>
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Gratis Ongkir untuk Pesanan Pertama</h3>
                <p className="mt-2 text-brand-contrast">Masukkan kode MAKANHEMAT saat checkout. Berlaku hari ini saja!</p>
                <div className="mt-6">
                  <Button variant="hero" size="lg">Belanja Sekarang</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} MakanKuy. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">Kebijakan Privasi</a>
            <a href="#" className="hover:text-foreground">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
