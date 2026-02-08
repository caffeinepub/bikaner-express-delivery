export default function MapEmbed() {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.99973188457!2d73.1544!3d28.0229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393fdd3e8d0a6f9f%3A0x9c8a7e0e0e0e0e0e!2sBikaner%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Bikaner Location"
      />
    </div>
  );
}
