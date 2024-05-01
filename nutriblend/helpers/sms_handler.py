import json

from django.conf import settings

from helpers.reusable import make_request


SMS_URL = "https://whispersms.xyz/transactional/send"


# SMS handler.
def send_otp(recipient: str, code: str):
    headers = {
        "Authorization": f"Api_key {settings.SMS_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = json.dumps(
        {
            "receiver": recipient,
            "template": settings.SMS_TEMPLATE_ID,
            "place_holders": {"otp_code": code},
        }
    )
    response = make_request("POST", dict(url=SMS_URL, headers=headers, data=payload))
    return response
