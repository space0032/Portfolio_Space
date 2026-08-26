const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = text(payload.name);
  const email = text(payload.email);
  const message = text(payload.message);
  const company = text(payload.company);

  // Silently accept bot submissions so the honeypot does not reveal itself.
  if (company) return Response.json({ ok: true });

  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || message.length < 10 || message.length > 5000) {
    return Response.json({ error: "Please check the form fields." }, { status: 400 });
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return Response.json({ error: "Contact delivery is not configured." }, { status: 503 });
  }

  try {
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: name,
          reply_to: email,
          message,
          to_name: "Antariksh Mankar",
        },
      }),
    });

    if (!emailJsResponse.ok) {
      return Response.json({ error: "Email delivery failed." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Email delivery failed." }, { status: 502 });
  }
}
