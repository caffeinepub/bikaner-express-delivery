export default function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/assets/generated/bed-logo.dim_512x512.png"
        alt="Bikaner Express Delivery"
        className="h-10 w-10 object-contain"
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-foreground">Bikaner Express</span>
        <span className="text-xs font-medium text-muted-foreground">Fast Delivery</span>
      </div>
    </div>
  );
}
