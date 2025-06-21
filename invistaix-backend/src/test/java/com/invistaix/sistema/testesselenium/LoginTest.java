package com.invistaix.sistema.testesselenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginTest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.opera.driver", "C:\\WebDriver\\operadriver.exe");
        driver = new ChromeDriver();
    }

    @Test
    public void testLoginGestor() {
        driver.get("http://localhost:5173");  

        WebElement campoEmail = driver.findElement(By.id("username"));
        WebElement campoSenha = driver.findElement(By.id("password"));
        WebElement botaoLogin = driver.findElement(By.xpath("//button[contains(., 'Entrar no Sistema')]"));

        campoEmail.sendKeys("gestor");
        campoSenha.sendKeys("Gestor123");
        botaoLogin.click();


        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        boolean loginOk = driver.getPageSource().contains("Bem-vindo") || driver.getCurrentUrl().contains("/dashboard");
        assertTrue(loginOk, "O login não foi bem-sucedido!");
    }


        @Test
    public void testLoginadmin() {
        driver.get("http://localhost:5173");  

        WebElement campoEmail = driver.findElement(By.id("username"));
        WebElement campoSenha = driver.findElement(By.id("password"));
        WebElement botaoLogin = driver.findElement(By.xpath("//button[contains(., 'Entrar no Sistema')]"));

        campoEmail.sendKeys("admin");
        campoSenha.sendKeys("Admin123");
        botaoLogin.click();


        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        boolean loginOk = driver.getPageSource().contains("Bem-vindo") || driver.getCurrentUrl().contains("/dashboard");
        assertTrue(loginOk, "O login não foi bem-sucedido!");
    }



        @Test
    public void testLoginproprietario() {
        driver.get("http://localhost:5173");  

        WebElement campoEmail = driver.findElement(By.id("username"));
        WebElement campoSenha = driver.findElement(By.id("password"));
        WebElement botaoLogin = driver.findElement(By.xpath("//button[contains(., 'Entrar no Sistema')]"));

        campoEmail.sendKeys("proprietario");
        campoSenha.sendKeys("Proprietario123");
        botaoLogin.click();


        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        boolean loginOk = driver.getPageSource().contains("Bem-vindo") || driver.getCurrentUrl().contains("/dashboard");
        assertTrue(loginOk, "O login não foi bem-sucedido!");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
