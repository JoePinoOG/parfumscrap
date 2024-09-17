import puppeteer from "puppeteer";


async function buscar(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://multimarcasperfumes.cl');
    await page.type('input[name="q"]', 'Moschino Toy Boy'); //aqui va el input del usuario
    await page.click('#search');
    await page.waitForSelector('.search__content');
    await page.click('');

    const precio = await page.evaluate(() => {
        const precioProducto = document.querySelector('.price .money');
        return precioProducto ? precioProducto.innerText : null;
        
    });

    const Titulo = await page.evaluate(() => {
        const TituloProducto = document.querySelector('h1');
        return TituloProducto ? TituloProducto.innerText : null;
        
    });
    const Descripcion = await page.evaluate(() => {
        const DescripcionProducto = document.querySelector('.product-block--description .description p');
        return DescripcionProducto ? DescripcionProducto.innerText : null;
        
    });


    console.log(` 
        ${Titulo} 
        ${precio}
        ${Descripcion}

        `);
    await browser.close();
}

buscar()