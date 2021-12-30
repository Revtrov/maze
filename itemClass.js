export default class Item {
    constructor(_color, _width, _height, _x, _y, _health, _attack, _defense, _destructive, _holdable, _moveable) {
        this.x = _x;
        this.y = _y;
        this.w = _width;
        this.h = _height;
        this.color = _color
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}