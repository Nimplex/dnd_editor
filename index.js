import { MapEditor } from "./scripts/app.js";

window.onload = function() {
    const mapEditor = new MapEditor();

    new p5(function(ctx) {
        ctx.draw = () => mapEditor.update(),
        ctx.setup = () => mapEditor.setup(ctx)
    });
}

// function keyPressed() {
//     let shiftModifier = keyIsDown(SHIFT);

//     switch (key.toLowerCase()) {
//         case "w": {
//             camera.move(0, shiftModifier ? -tileSize * 4 : -tileSize);
//             break;
//         }
//         case "s": {
//             camera.move(0, shiftModifier ? tileSize * 4 : tileSize);
//             break;
//         }
//         case "a": {
//             camera.move(shiftModifier ? -tileSize * 4 : -tileSize, 0);
//             break;
//         }
//         case "d": {
//             camera.move(shiftModifier ? tileSize * 4 : tileSize, 0);
//             break;
//         }
//         case "arrowup": {
//             camera.move(0, -tileSize / 4);
//             break;
//         }
//         case "arrowdown": {
//             camera.move(0, tileSize / 4);
//             break;
//         }
//         case "arrowleft": {
//             camera.move(-tileSize / 4, 0);
//             break;
//         }
//         case "arrowright": {
//             camera.move(tileSize / 4, 0);
//             break;
//         }
//     }
// }
