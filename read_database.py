import requests, json
from local_setting import TOKEN, DATABASE_ID

headers = {
    "Authorization": "Bearer " + TOKEN,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

def readDatabase(databaseId, headers):
    readUrl = f"https://api.notion.com/v1/databases/{databaseId}/query"
    res = requests.request("POST", readUrl, headers=headers)
    data = res.json()
    print(res.status_code)

    with open('./db.json', 'w', encoding='utf8') as f:
        json.dump(data, f, ensure_ascii=False)

readDatabase(DATABASE_ID, headers)