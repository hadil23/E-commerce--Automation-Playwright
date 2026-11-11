class LoginPage {
    constructor(page){
        this.page = page;
        this.baseUrl =  process.env.BASE_URL ; 

        //Locators 
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton =  page.getByRole('button',{ name:'Login'});
    }
    async open(){
        await this.page.goto(this.baseUrl)
    } ;
    async login(username , password

    ) {
         await this.usernameInput.fill(username);
         await this.passwordInput.fill(password);
         await this.loginButton.click();
    }
}
module.exports ={LoginPage} ; 