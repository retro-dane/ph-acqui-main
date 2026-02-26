const nodemailer = require("nodemailer")

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body)

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name, email, and message are required" }),
      }
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email to the business
    const businessMailOptions = {
      from: `"PH Aqui Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "phacquimain@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This message was sent from the PH Aqui website contact form.
        </p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}

---
This message was sent from the PH Aqui website contact form.
      `,
    }

    // Send the email
    await transporter.sendMail(businessMailOptions)

    // Optionally send confirmation to the customer
    if (process.env.SEND_CONFIRMATION === "true") {
      const confirmationMailOptions = {
        from: `"PH Aqui" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank you for contacting PH Aqui",
        html: `
          <h2>Thank you for reaching out, ${name}!</h2>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p>If you have any urgent inquiries, please call us at <strong>876 317-5375</strong>.</p>
          <hr>
          <p>Best regards,<br>The PH Aqui Team</p>
        `,
      }
      await transporter.sendMail(confirmationMailOptions)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    }
  }
}
