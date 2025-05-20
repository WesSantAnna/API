import requests
from .schema import TokenRequest

class APIClient:
    def __init__(self, base_url: str):
        self.base_url = base_url

    def get_tokens(self, data: TokenRequest):
        url = f"{self.base_url}/token"
        response = requests.post(
            url,
            json={"username": data.username, "password": data.password},
            headers={"Content-Type": "application/json"}
        )
        return response
    
    def verify_token(self, token: str):
        url = f"{self.base_url}/token/verify"
        response = requests.post(
            url,
            json={"token": token},
            headers={"Content-Type": "application/json"}
        )
        return response

    def refresh_token(self, refresh_token: str):
        url = f"{self.base_url}/token/refresh"
        response = requests.post(
            url,
            json={"refresh": refresh_token},
            headers={"Content-Type": "application/json"}
        )
        return response   

    def user_data(self, access_token: str):
        url = f"{self.base_url}/usercorp"
        headers = {
            "Authorization" : f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        response = requests.get(url, headers=headers)
        return response
    
    def get_tree(self, id: str, access_token: str):
        url = f"{self.base_url}/implantation/mobile/tree?site={id}"
        headers = {
            "Authorization" : f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        response = requests.get(url, headers=headers)
        return response

    def get_retrieve_asset_info(self, id: str, access_token: str):
        url = f"{self.base_url}/implantation/mobile/info?site={id}"
        headers = {
            "Authorization" : f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        response = requests.get(url, headers=headers)
        return response