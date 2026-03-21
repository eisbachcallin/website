import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type ConfirmationEmailData = {
  first: string
  last: string
  crew: string
  uuid?: string
}

export async function sendConfirmationEmail(
  to: string,
  data: ConfirmationEmailData
) {
  const { first, last, crew } = data

  const html = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px;">

  <p>Hey ${first},</p>
  <p>dein Invite ist bestätigt – wir sehen uns am <strong>17.–18. Juli 2026</strong> auf dem <strong>Jim Camp Gelände in Schattenhofen</strong>.</p>

  <p>Hier nochmal deine Details:</p>
  <p><strong>Name:</strong> ${first} ${last}<br/><strong>Crew:</strong> ${crew}</p>

  <p>Fragen? Schreib uns: <a href="mailto:camp@eisbachcallin.com">camp@eisbachcallin.com</a></p>

  <p>Bis bald,<br/>Eisbach Callin, Time Tripping &amp; Bam Bam</p>

  <hr style="border:none;border-top:1px solid #ddd;margin:32px 0;" />

  <p>Hey ${first},</p>
  <p>your invite is confirmed – see you on <strong>July 17–18, 2026</strong> at <strong>Jim Camp Grounds in Schattenhofen</strong>.</p>

  <p>Here are your details:</p>
  <p><strong>Name:</strong> ${first} ${last}<br/><strong>Crew:</strong> ${crew}</p>

  <p>Questions? Hit us up: <a href="mailto:camp@eisbachcallin.com">camp@eisbachcallin.com</a></p>

  <p>See you there,<br/>Eisbach Callin, Time Tripping &amp; Bam Bam</p>

</body>
</html>
`

  await resend.emails.send({
    from: 'Eisbach Callin <camp@eisbachcallin.com>',
    to,
    subject: 'Du bist dabei – CAMP 2026 / You\'re in – CAMP 2026',
    html,
  })
}
