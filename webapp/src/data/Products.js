const products = [
    { name: "Munchee Onion Biscuit", glbPath: "../../assets/products/MuncheeOnion.glb", positions: [[15.5, 1.5, -1.5],[15.5, 1.5, -1],[15.5, 1.5, -0.5],[15.5, 1.5, 0]], scale: [1, 1, 1], price: 120 },
    { name: "Munchee Savoury Biscuit", glbPath: "../../assets/products/MuncheeSavoury.glb", positions: [[15.5, 1.5, 0.5],[15.5, 1.5, 1],[15.5, 1.5, 1.5],[15.5, 1.5, 2],[15.5, 1.5, 2.5]], scale: [1, 1, 1], price: 140 },
    { name: "Maliban Krisco Biscuit", glbPath: "../../assets/products/MalibanKrisco.glb", positions: [[15.5, 1.5, 3],[15.5, 1.5, 3.5],[15.5, 1.5, 4],[15.5, 1.5, 4.5]], scale: [1, 1, 1], price: 160 },
    { name: "Munchee Cheese Button Biscuit", glbPath: "../../assets/products/MuncheeCheeseButtons.glb", positions: [[15.5, 1.5, 5],[15.5, 1.5, 5.5],[15.5, 1.5, 6],[15.5, 1.5, 6.5],[15.5, 1.5, 7]], scale: [1, 1, 1], price: 180 },
    { name: "Munchee LemonPuff Biscuit", glbPath: "../../assets/products/MuncheeLemonPuff.glb", positions: [[15.5, 2.25, -1],[15.5, 2.25, 0],[15.5, 2.25, 1],[15.5, 2.25, 2]], scale: [1, 1, 1], price: 150 },
    { name: "Munchee ChocolatePuff Biscuit", glbPath: "../../assets/products/MuncheeChocolatePuff.glb", positions: [[15.5, 2.4, 3],[15.5, 2.4, 4],[15.5, 2.4, 5],[15.5, 2.4, 6]], scale: [1, 1, 1], price: 170 },
    { name: "Munchee Nice Biscuit", glbPath: "../../assets/products/MuncheeNice.glb", positions: [[15.5, 2.4, 7],[15.5, 2.4, 8]], scale: [1, 1, 1], price: 130 },
    { name: "Maliban Krisco Biscuit Box", glbPath: "../../assets/products/MalibanKriscoBox.glb", positions: [[15.5, 0.5, 3],[15.5, 0.5, 3.5],[15.5, 0.5, 4],[15.5, 0.5, 4.5],[15.5, 0.5, 5],[15.5, 0.5, 5.5]], scale: [1, 1, 1], price: 250 },
    { name: "Munchee Savoury Biscuit Box", glbPath: "../../assets/products/MuncheeSavouryBox.glb", positions: [[15.5, 0.5, 2.5],[15.5, 0.5, -1],[15.5, 0.5, -0.5],[15.5, 0.5, 0],[15.5, 0.5, 0.5],[15.5, 0.5, 1],[15.5, 0.5, 1.5],[15.5, 0.5, 2]], scale: [1, 1, 1], price: 300 },
    { name: "Munchee Cheese Button Biscuit Box", glbPath: "../../assets/products/MuncheeCheeseButtonsBox.glb", positions: [[15.5, 0.5, 6],[15.5, 0.5, 6.5],[15.5, 0.5, 7],[15.5, 0.5, 7.5],[15.5, 0.5, 8]], scale: [1, 1, 1], price: 300 },

    { name: "Pepsi 1l Bottle", glbPath: "../../assets/products/Pepsi1L(set).glb", positions: [[19, 1.95, 14.7]], scale: [1, 1, 1], price: 200 },
    { name: "Sprite 1l Bottle", glbPath: "../../assets/products/Sprite1L(set).glb", positions: [[23.5, 1.95, 14.7]], scale: [1, 1, 1], price: 190 },
    { name: "CocaCola 1l Bottle", glbPath: "../../assets/products/CocaCola1L(set).glb", positions: [[23, 3.1, 14.7]], scale: [1, 1, 1], price: 210 },
    { name: "Fanta 1l Bottle", glbPath: "../../assets/products/Fanta1L(set).glb", positions: [[18, 3.1, 14.7]], scale: [1, 1, 1], price: 200 },
    { name: "Redbull", glbPath: "../../assets/products/Redbull(set).glb", positions: [[18, 0.3, 14.65]], scale: [1, 1, 1], price: 350 },
    { name: "SunCrush", glbPath: "../../assets/products/SunCrush(set).glb", positions: [[23, 0.3, 14.65]], scale: [1, 1, 1], price: 220 },

    { name: "Imorich Chocolate IceCream", glbPath: "../../assets/products/Imorich2L.glb", positions: [[-22.25, 1, -2],[-22.25, 1, -1.25],[-22.25, 1, -0.5],[-22.25, 1, 0.25]], scale: [0.8, 0.8, 0.8], price: 1200 },
    { name: "Imorich Chocolate IceCream", glbPath: "../../assets/products/Imorich1L.glb", positions: [[-21.5, 1, -2],[-21.5, 1, -1.5],[-21.5, 1, -1],[-21.5, 1, -0.5],[-21.5, 1, 0],[-21.5, 1, 0.5]], scale: [1, 1, 1], price: 600 },
    { name: "Elephant House Vanilla 1l", glbPath: "../../assets/products/EHVanilla1L.glb", positions: [[-21.5, 1, 1.25],[-21.5, 1, 2],[-21.5, 1, 2.75]], scale: [1, 1, 1], price: 600 },
    { name: "Elephant House Chocolate 1l", glbPath: "../../assets/products/EHChocolate1L.glb", positions: [[-22.25, 1, 1.25],[-22.25, 1, 2],[-22.25, 1, 2.75]], scale: [1, 1, 1], price: 600 },
    { name: "Milk#1 1l", glbPath: "../../assets/products/Milk001(set).glb", positions: [[-22.25, 2.15, -0.5]], scale: [1, 1, 1], price: 600 },
    { name: "Milk#1 1l", glbPath: "../../assets/products/Milk002(set).glb", positions: [[-22.25, 2.15, 2]], scale: [1, 1, 1], price: 600 },
];

export default products;
