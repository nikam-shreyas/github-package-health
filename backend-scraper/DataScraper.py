import requests
from bs4 import BeautifulSoup
from utils import text_to_datetime

class DataScraper:
    def __init__(self, report_id, type="python"):
        self.report_id = report_id
        self.type = type
        self.packages = self.build_data()
    
    def build_data(self):
        
        statuses = ['healthy', 'needReview', 'sustainable', 'unknown']
        packages = []
        for status in statuses:
            url = f"<SNYK_REPORT_API>"
            response = requests.get(url)
            soup = BeautifulSoup(response.content, "html.parser")
            for package in soup.find_all("div", {"class": "package"}):
                data = self.parse_package(package, status)
                if data['title']!='-':
                    packages.append(data)
        return packages
    
    def parse_package(self, package, status):
        data = {'Weekly Downloads': 0, 
                'Last Release': '-', 
                'License': '-', 
                'Contributors': 0, 
                'Vulnerabilities': '0 C0 H0 M0 L', 
                'title': '-', 
                'version': '-', 
                'status': status, 
                'package_health_score': 0}
        try:
            package_title = package.find("div", {"class": "package-title"}).text.strip()
            data["title"] = package_title
        except:
            pass
        try:
            package_history = package.find("div", {"class": "package-history"}).text.strip()
            data['version'] = package_history
        except:
            pass
        
        try:
            for item in package.find_all("div", {"class": "stats-item"}):
                label = item.find("dt").text.strip()
                value = item.find("dd").text.strip()
                data[label] = value.strip()
            data['status'] = status

            if data['Weekly Downloads'] != '-':
                data['Weekly Downloads'] = int(data['Weekly Downloads'].replace(",",""))
            data['weeklyDownloads'] = data['Weekly Downloads']
            del data['Weekly Downloads']

            
            data['lastRelease'] = data['Last Release']
            del data['Last Release']
            
            data['Contributors'] = int(data['Contributors'] if data['Contributors']!='-' else 0)
        except:
            pass

        try:
            package_health_score = package.find("div", {"class": "package-health-score"}).text.strip()
            package_health_score = int(package_health_score[package_health_score.find("Package Health Score")+20:package_health_score.find("/")])
            data['packageHealthScore'] = package_health_score
        except:
            pass
        
        del data['License']
        
        return data

