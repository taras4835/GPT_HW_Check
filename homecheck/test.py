import requests

url = 'https://poreshai-xax5k.ondigitalocean.app/api/users/users/'
headers = {
    'Telegram-Id': '1',
    'Telegram-Data': '2'
}

try:
    resp = requests.get(url, headers=headers)
    print(f"Status Code: {resp.status_code}")
    print(f"Response Body: {resp.text}")  # Print response content if needed
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")