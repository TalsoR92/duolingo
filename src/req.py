import requests

def make_duolingo_request():
    url = "https://www.duolingo.com/2017-06-30/users/1426864636/courses/en/fr/learned-lexemes?limit=50&sortBy=LEARNED_DATE&startIndex=50"
    headers = {
        "Accept": "application/json; charset=UTF-8",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjYzMDcyMDAwMDAsImlhdCI6MCwic3ViIjoxNDI2ODY0NjM2fQ.ghjqUUPHD6P7Sxp5kRnNL3T3TGSH6iAnR5LXwOhB_sc",
        "Content-Type": "application/json; charset=UTF-8",
        "Cookie": "lu=https://fr.duolingo.com/; initial_referrer=https://www.google.com/; lp=splash; lr=; csrf_token=IjE1ZDZmODA5MmM2NjQxYTdhZTFmMjA5OTM4MWNiMjdmIg==; logged_out_uuid=1426864636; logged_in=true; FCCDCF=%5Bnull%2Cnull%2Cnull%2C%5B%22CP9Dx0AP9Dx0AEsACBFRAwEoAP_gAEPgACiQINJD7D7FbSFCwH5zaLsAMAhHRsCAQoQAAASBAmABQAKQIAQCgkAQFASgBAACAAAAICZBIQIECAAACUAAQAAAAAAEAAAAAAAIIAAAgAEAAAAIAAACAAAAEAAIAAAAEAAAmAAAAIIACAAAhAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAQOhQD2F2K2kKFkPCmQWYAQBCijYEAhQAAAAkCBIAAgAUgQAgFIIAgAIFAAAAAAAAAQEgCQAAQABAAAIACgAAAAAAIAAAAAAAQQAAAAAIAAAAAAAAEAAAAAAAQAAAAIAABEgCAAQQAEAAAAAAAQAAAAAAAAAAABAAA%22%2C%222~2072.70.89.93.108.122.149.196.2253.2299.259.2357.311.313.323.2373.338.358.2415.415.449.2506.2526.486.494.495.2568.2571.2575.540.574.2624.609.2677.864.981.1029.1048.1051.1095.1097.1126.1205.1211.1276.1301.1365.1415.1423.1449.1570.1577.1598.1651.1716.1735.1753.1765.1870.1878.1889.1896.1958~dv.%22%2C%223D7F177E-617F-4F15-B92F-211F2F6440E1%22%5D%5D; wuuid=e674a5a1-c944-4cca-8af2-da8130ee96d3; lang=fr; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjYzMDcyMDAwMDAsImlhdCI6MCwic3ViIjoxNDI2ODY0NjM2fQ.ghjqUUPHD6P7Sxp5kRnNL3T3TGSH6iAnR5LXwOhB_sc; tsl=1713567959474; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Apr+20+2024+01%3A06%3A01+GMT%2B0200+(heure+d%E2%80%99%C3%A9t%C3%A9+d%E2%80%99Europe+centrale)&version=6.16.0&isIABGlobal=false&consentId=7a687945-2ad8-4801-952e-63c386322acb&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&hosts=H3%3A1%2CH14%3A1%2CH11%3A0%2CH1%3A0%2CH15%3A0%2CH6%3A0%2CH22%3A0%2CH2%3A0%2CH26%3A0%2CH7%3A0%2CH16%3A0%2CH9%3A0%2CH28%3A0%2CH18%3A0%2CH10%3A0%2CH12%3A0%2CH13%3A0&AwaitingReconsent=false; FCNEC=%5B%5B%22AKsRol-tZvQYHjOktFSHtD_LNSbpnrc1z2daTrxQrWNnINOI4cMiBVHfqipScNJXG_MEef5LwBvlz1NI7GeNQt_cEi5m-rpQdrmSZp9vDX4BNEOI68TxyTjpsOpDZTKVKYchmdJEKZdV-zTc7rN7KKNI67MUnSdOFg%3D%3D%22%5D%5D; AWSALB=xABYkbN3nUK4k6NflIVsi7aby4n0IFYr9z3+GOPO9aMS8wdmwr93mxn0gR8OgPoRGn/KJNi7A7Rp7FdQb+0GpzsEamKOiVNPdZS01jT+CgZwlEfsbLQY9yhHw4ch; AWSALBCORS=xABYkbN3nUK4k6NflIVsi7aby4n0IFYr9z3+GOPO9aMS8wdmwr93mxn0gR8OgPoRGn/KJNi7A7Rp7FdQb+0GpzsEamKOiVNPdZS01jT+CgZwlEfsbLQY9yhHw4ch",
        "Origin": "https://www.duolingo.com",
        "Referer": "https://www.duolingo.com/practice-hub/words",
        "Sec-Ch-Ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "X-Amzn-Trace-Id": "User=1426864636",
        "X-Requested-With": "XMLHttpRequest"
    }
    
    response = requests.post(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}"

# Exemple d'utilisation de la fonction
data = make_duolingo_request()
print(data)
