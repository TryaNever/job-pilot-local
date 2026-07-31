from bs4 import BeautifulSoup, Comment


class SoupCleaner:

    REMOVE_TAGS = [
        "script",
        "style",
        "head",
        "meta",
        "noscript",
        "button",
        "nav",
        "footer",
        "svg"
    ]

    REMOVE_ATTRS = [
        "class",
        "style",
        "id",
        "onclick",
        "data-*"
    ]

    def clean(self, html: str) -> str:
        soup = BeautifulSoup(html, "html.parser")

        self.remove_tags(soup)
        self.remove_comments(soup)
        self.remove_attributes(soup)
        self.extract_text(soup)

        return soup


    def remove_tags(self, soup):
        for tag in soup(self.REMOVE_TAGS):
            tag.decompose()


    def remove_comments(self, soup):
        for comment in soup.find_all(
            string=lambda text: isinstance(text, Comment)
        ):
            comment.extract()


    def remove_attributes(self, soup):
        for tag in soup.find_all(True):
            tag.attrs = {}


    def extract_text(self, soup):
        for tag in soup.find_all():
            if not tag.get_text(strip=True):
                tag.decompose()
                
    def to_text(self, soup) -> str:
        return soup.get_text(
            separator="\n",
            strip=True
        )