describe("Click on role management", function () {
    it("Operation on role management page ", function () {
        browser.driver.manage().window().maximize();    
        browser.get("https://enterpriseweb.dev.cndt.cf/manage/roleManagement");  
        var title=browser.getTitle();  
        expect(title).toEqual('RoleManagement')     
    }),
    it('should click navigation elements', function  (){
        var bm= element(by.xpath("//span[contains(text(),'Business Manager')]"));
        bm.click();
        var ba=element(by.xpath("//span[contains(text(),'Business Analyst')]"));
        ba.click();
        var bsa= element(by.xpath("//span[contains(text(),'Business Support Analyst')]"));
        bsa.click();
        var del= element(by.xpath("//span[contains(text(),'Data Entry Lead')]"));
        del.click();
        var ml= element(by.xpath("//span[contains(text(),'Mailroom Lead')]"));
        ml.click();       
    }),
    it("should perform click operations ", function () {
        var MailroomChckbox =  element(by.xpath('//*[@id="mat-checkbox-1"]/label/span/span[2]'));
        var DataentryChckbox= element(by.xpath('//*[@id="mat-checkbox-2"]/label/div'));
        MailroomChckbox.click();       
        DataentryChckbox.click();
        browser.sleep(500)
    }),
    it("should navigate to remaining tabs ", function () {
        var Objects =element(by.xpath('//*[@id="mat-tab-label-0-1"]'))
        Objects.click();
        browser.sleep(500);
        var WorkFlow= element(by.xpath("//mat-checkbox[@id='mat-checkbox-9']//label[@class='mat-checkbox-layout']"));
        WorkFlow.click();
        browser.sleep(500);
        var Reports=element(by.xpath("//mat-checkbox[@id='mat-checkbox-10']//label[@class='mat-checkbox-layout'] "));
        Reports.click();
        browser.sleep(500);
        var Members =element(by.xpath('//*[@id="mat-tab-label-0-2"]/div'))
        Members.click();
        browser.sleep(500);
    }),
    it("should search in help", function () {
        var Help= element(by.xpath("//mat-icon[contains(text(),'help_outline')]"));
        Help.click();
        var HelpSearch = element(by.xpath("//input[@placeholder='Search Help...']"));
        HelpSearch.sendKeys("Business Analyst");
        browser.sleep(2000)
        Help.click();
    })
});