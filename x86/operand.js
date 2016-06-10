"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var regfile_1 = require('./regfile');
var operand_1 = require('../operand');
var o = require('../operand');
var DisplacementValue = (function (_super) {
    __extends(DisplacementValue, _super);
    function DisplacementValue(value) {
        _super.call(this, value, true);
    }
    DisplacementValue.prototype.setValue32 = function (value) {
        _super.prototype.setValue32.call(this, value);
    };
    DisplacementValue.SIZE = {
        DISP8: operand_1.SIZE.B,
        DISP32: operand_1.SIZE.D,
    };
    return DisplacementValue;
}(operand_1.Constant));
exports.DisplacementValue = DisplacementValue;
var Register = (function (_super) {
    __extends(Register, _super);
    function Register(id, size) {
        _super.call(this, id, size);
        this.name = Register.getName(size, id).toLowerCase();
    }
    Register.getName = function (size, id) {
        var def = 'REG';
        if (typeof size !== 'number')
            return def;
        if (typeof id !== 'number')
            return def;
        switch (size) {
            case operand_1.SIZE.Q: return regfile_1.R64[id];
            case operand_1.SIZE.D: return regfile_1.R32[id];
            case operand_1.SIZE.W: return regfile_1.R16[id];
            case operand_1.SIZE.B:
                if (this instanceof Register8High)
                    return regfile_1.R8H[id];
                else
                    return regfile_1.R8[id];
            default: return def;
        }
    };
    Register.prototype.ref = function () {
        return (new Memory).ref(this);
    };
    Register.prototype.ind = function (scale_factor) {
        return (new Memory).ind(this, scale_factor);
    };
    Register.prototype.disp = function (value) {
        return (new Memory).ref(this).disp(value);
    };
    Register.prototype.isExtended = function () {
        return this.id > 7;
    };
    Register.prototype.get3bitId = function () {
        return this.id & 7;
    };
    return Register;
}(operand_1.Register));
exports.Register = Register;
var Register8 = (function (_super) {
    __extends(Register8, _super);
    function Register8(id) {
        _super.call(this, id, operand_1.SIZE.B);
    }
    return Register8;
}(Register));
exports.Register8 = Register8;
var Register8High = (function (_super) {
    __extends(Register8High, _super);
    function Register8High() {
        _super.apply(this, arguments);
    }
    return Register8High;
}(Register8));
exports.Register8High = Register8High;
var Register16 = (function (_super) {
    __extends(Register16, _super);
    function Register16(id) {
        _super.call(this, id, operand_1.SIZE.W);
    }
    return Register16;
}(Register));
exports.Register16 = Register16;
var Register32 = (function (_super) {
    __extends(Register32, _super);
    function Register32(id) {
        _super.call(this, id, operand_1.SIZE.D);
    }
    return Register32;
}(Register));
exports.Register32 = Register32;
var Register64 = (function (_super) {
    __extends(Register64, _super);
    function Register64(id) {
        _super.call(this, id, operand_1.SIZE.Q);
    }
    return Register64;
}(Register));
exports.Register64 = Register64;
var RegisterRip = (function (_super) {
    __extends(RegisterRip, _super);
    function RegisterRip() {
        _super.call(this, 0);
    }
    RegisterRip.prototype.getName = function () {
        return 'rip';
    };
    return RegisterRip;
}(Register64));
exports.RegisterRip = RegisterRip;
exports.rax = new Register64(regfile_1.R64.RAX);
exports.rbx = new Register64(regfile_1.R64.RBX);
exports.rcx = new Register64(regfile_1.R64.RCX);
exports.rdx = new Register64(regfile_1.R64.RDX);
exports.rsi = new Register64(regfile_1.R64.RSI);
exports.rdi = new Register64(regfile_1.R64.RDI);
exports.rbp = new Register64(regfile_1.R64.RBP);
exports.rsp = new Register64(regfile_1.R64.RSP);
exports.r8 = new Register64(regfile_1.R64.R8);
exports.r9 = new Register64(regfile_1.R64.R9);
exports.r10 = new Register64(regfile_1.R64.R10);
exports.r11 = new Register64(regfile_1.R64.R11);
exports.r12 = new Register64(regfile_1.R64.R12);
exports.r13 = new Register64(regfile_1.R64.R13);
exports.r14 = new Register64(regfile_1.R64.R14);
exports.r15 = new Register64(regfile_1.R64.R15);
exports.rip = new RegisterRip;
exports.eax = new Register32(regfile_1.R32.EAX);
exports.ebx = new Register32(regfile_1.R32.EBX);
exports.ecx = new Register32(regfile_1.R32.ECX);
exports.edx = new Register32(regfile_1.R32.EDX);
exports.esi = new Register32(regfile_1.R32.ESI);
exports.edi = new Register32(regfile_1.R32.EDI);
exports.ebp = new Register32(regfile_1.R32.EBP);
exports.esp = new Register32(regfile_1.R32.ESP);
exports.r8d = new Register32(regfile_1.R32.R8D);
exports.r9d = new Register32(regfile_1.R32.R9D);
exports.r10d = new Register32(regfile_1.R32.R10D);
exports.r11d = new Register32(regfile_1.R32.R11D);
exports.r12d = new Register32(regfile_1.R32.R12D);
exports.r13d = new Register32(regfile_1.R32.R13D);
exports.r14d = new Register32(regfile_1.R32.R14D);
exports.r15d = new Register32(regfile_1.R32.R15D);
exports.ax = new Register16(regfile_1.R16.AX);
exports.bx = new Register16(regfile_1.R16.BX);
exports.cx = new Register16(regfile_1.R16.CX);
exports.dx = new Register16(regfile_1.R16.DX);
exports.si = new Register16(regfile_1.R16.SI);
exports.di = new Register16(regfile_1.R16.DI);
exports.bp = new Register16(regfile_1.R16.BP);
exports.sp = new Register16(regfile_1.R16.SP);
exports.r8w = new Register16(regfile_1.R16.R8W);
exports.r9w = new Register16(regfile_1.R16.R9W);
exports.r10w = new Register16(regfile_1.R16.R10W);
exports.r11w = new Register16(regfile_1.R16.R11W);
exports.r12w = new Register16(regfile_1.R16.R12W);
exports.r13w = new Register16(regfile_1.R16.R13W);
exports.r14w = new Register16(regfile_1.R16.R14W);
exports.r15w = new Register16(regfile_1.R16.R15W);
exports.al = new Register8(regfile_1.R8.AL);
exports.bl = new Register8(regfile_1.R8.BL);
exports.cl = new Register8(regfile_1.R8.CL);
exports.dl = new Register8(regfile_1.R8.DL);
exports.sil = new Register8(regfile_1.R8.SIL);
exports.dil = new Register8(regfile_1.R8.DIL);
exports.bpl = new Register8(regfile_1.R8.BPL);
exports.spl = new Register8(regfile_1.R8.SPL);
exports.r8b = new Register8(regfile_1.R8.R8B);
exports.r9b = new Register8(regfile_1.R8.R9B);
exports.r10b = new Register8(regfile_1.R8.R10B);
exports.r11b = new Register8(regfile_1.R8.R11B);
exports.r12b = new Register8(regfile_1.R8.R12B);
exports.r13b = new Register8(regfile_1.R8.R13B);
exports.r14b = new Register8(regfile_1.R8.R14B);
exports.r15b = new Register8(regfile_1.R8.R15B);
exports.ah = new Register8High(regfile_1.R8H.AH);
exports.bh = new Register8High(regfile_1.R8H.BH);
exports.ch = new Register8High(regfile_1.R8H.CH);
exports.dh = new Register8High(regfile_1.R8H.DH);
var Scale = (function (_super) {
    __extends(Scale, _super);
    function Scale(scale) {
        if (scale === void 0) { scale = 1; }
        _super.call(this);
        if (Scale.VALUES.indexOf(scale) < 0)
            throw TypeError("Scale must be one of [1, 2, 4, 8].");
        this.value = scale;
    }
    Scale.prototype.toString = function () {
        return '' + this.value;
    };
    Scale.VALUES = [1, 2, 4, 8];
    return Scale;
}(operand_1.Operand));
exports.Scale = Scale;
var Memory = (function (_super) {
    __extends(Memory, _super);
    function Memory() {
        _super.apply(this, arguments);
        this.base = null;
        this.index = null;
        this.scale = null;
        this.displacement = null;
    }
    Memory.factory = function (size) {
        switch (size) {
            case operand_1.SIZE.B: return new Memory8;
            case operand_1.SIZE.W: return new Memory16;
            case operand_1.SIZE.D: return new Memory32;
            case operand_1.SIZE.Q: return new Memory64;
            default: return new Memory;
        }
    };
    Memory.prototype.cast = function (size) {
        var mem = Memory.factory(size);
        mem.base = this.base;
        mem.index = this.index;
        mem.scale = this.scale;
        mem.displacement = this.displacement;
        return mem;
    };
    Memory.prototype.reg = function () {
        if (this.base)
            return this.base;
        if (this.index)
            return this.index;
        return null;
    };
    Memory.prototype.needsSib = function () {
        return !!this.index || !!this.scale;
    };
    Memory.prototype.ref = function (base) {
        if (this.index) {
            if (base.size !== this.index.size)
                throw TypeError('Registers dereferencing memory must be of the same size.');
        }
        var is_ebp = (regfile_1.R64.RBP & 7) === base.get3bitId();
        if (is_ebp && !this.displacement)
            this.displacement = new DisplacementValue(0);
        return _super.prototype.ref.call(this, base);
    };
    Memory.prototype.ind = function (index, scale_factor) {
        if (scale_factor === void 0) { scale_factor = 1; }
        if (this.base) {
            if (this.base instanceof RegisterRip)
                throw TypeError("Cannot have index in memory reference that bases on " + this.base.toString() + ".");
            if (this.base.size !== index.size)
                throw TypeError('Registers dereferencing memory must be of the same size.');
        }
        if (!(index instanceof Register))
            throw TypeError('Index must by of type Register.');
        var esp = (regfile_1.R64.RSP & 7);
        if (index.get3bitId() === esp)
            throw TypeError('%esp, %rsp or other 0b100 registers cannot be used as addressing index.');
        this.index = index;
        this.scale = new Scale(scale_factor);
        return this;
    };
    Memory.prototype.disp = function (value) {
        this.displacement = new DisplacementValue(value);
        return this;
    };
    Memory.prototype.toString = function () {
        var parts = [];
        if (this.base)
            parts.push(this.base.toString());
        if (this.index)
            parts.push(this.index.toString() + ' * ' + this.scale.toString());
        if (this.displacement)
            parts.push(this.displacement.toString());
        return "[" + parts.join(' + ') + "]";
    };
    return Memory;
}(operand_1.Memory));
exports.Memory = Memory;
var Memory8 = (function (_super) {
    __extends(Memory8, _super);
    function Memory8() {
        _super.apply(this, arguments);
        this.size = operand_1.SIZE.B;
    }
    return Memory8;
}(Memory));
exports.Memory8 = Memory8;
var Memory16 = (function (_super) {
    __extends(Memory16, _super);
    function Memory16() {
        _super.apply(this, arguments);
        this.size = operand_1.SIZE.W;
    }
    return Memory16;
}(Memory));
exports.Memory16 = Memory16;
var Memory32 = (function (_super) {
    __extends(Memory32, _super);
    function Memory32() {
        _super.apply(this, arguments);
        this.size = operand_1.SIZE.D;
    }
    return Memory32;
}(Memory));
exports.Memory32 = Memory32;
var Memory64 = (function (_super) {
    __extends(Memory64, _super);
    function Memory64() {
        _super.apply(this, arguments);
        this.size = operand_1.SIZE.Q;
    }
    return Memory64;
}(Memory));
exports.Memory64 = Memory64;
var Operands = (function (_super) {
    __extends(Operands, _super);
    function Operands() {
        _super.apply(this, arguments);
    }
    Operands.findSize = function (ops) {
        for (var _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
            var operand = ops_1[_i];
            if (operand instanceof Register)
                return operand.size;
        }
        return operand_1.SIZE.NONE;
    };
    Operands.prototype.getRegisterOperand = function (dst_first) {
        if (dst_first === void 0) { dst_first = true; }
        var _a = this.list, dst = _a[0], src = _a[1];
        var first, second;
        if (dst_first) {
            first = dst;
            second = src;
        }
        else {
            first = src;
            second = dst;
        }
        if (first instanceof Register)
            return first;
        if (second instanceof Register)
            return second;
        return null;
    };
    Operands.prototype.hasImmediate = function () {
        return !!this.getImmediate();
    };
    Operands.prototype.hasExtendedRegister = function () {
        var _a = this.list, dst = _a[0], src = _a[1];
        if (dst && dst.reg() && dst.reg().isExtended())
            return true;
        if (src && src.reg() && src.reg().isExtended())
            return true;
        return false;
    };
    return Operands;
}(o.Operands));
exports.Operands = Operands;
