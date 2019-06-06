describe("Home page Validations", function () {
	it("Click on oepn portal ", function () {
		browser.driver.manage().window().maximize();
		browser.get("https://enterpriseweb.dev.cndt.cf/home");
		var openPortalbtn= element(by.xpath("//body//div[@class='page-content']//div//div[1]//app-home-card[1]//div[1]//mat-card[1]//mat-card-title[1]//button[1]//span[1]//mat-icon[1]"));
		openPortalbtn.click();
		browser.sleep(200);
		var cancelbtn= element(by.className("btn-primary mat-raised-button"));
		cancelbtn.click();
	}),
	it('should click open portal and also should delete Microsoft client', () => {
		var delIcon= element(by.xpath("//body//div[@class='page-content']//div//div[1]//app-home-card[1]//div[1]//mat-card[1]//mat-card-title[1]//button[2]//span[1]//mat-icon[1] "));
		delIcon.click();
		browser.sleep(200);
		browser.getAllWindowHandles().then(function(handles){
			browser.switchTo().window(handles[0]).then(function(){
			var delBttn= element(by.xpath("//span[contains(text(),'Delete')]"))
			delBttn.click();
			browser.sleep(200);
			});
		});
	});
});