"use strict";
var util_1 = require('../../util');
var o = require('../operand');
var t = require('../table');
var table_1 = require('../../table');
var table_2 = require('../table');
exports.defaults = util_1.extend({}, t.defaults, { rex: false });
function tpl_and(o_al, o_imm, or_imm, o_reg, lock) {
    if (o_al === void 0) { o_al = 0x24; }
    if (o_imm === void 0) { o_imm = 0x80; }
    if (or_imm === void 0) { or_imm = 4; }
    if (o_reg === void 0) { o_reg = 0x20; }
    if (lock === void 0) { lock = true; }
    return [{ lock: lock },
        { o: o_al, ops: [o.al, table_1.imm8], mr: false },
        { o: o_al + 1, ops: [o.ax, table_1.imm16], mr: false },
        { o: o_al + 1, ops: [o.eax, table_1.imm32], mr: false },
        { o: o_al + 1, ops: [o.rax, table_1.imm32], mr: false },
        { o: o_imm, or: or_imm, ops: [table_2.rm8, table_1.imm8] },
        { o: o_imm + 1, or: or_imm, ops: [table_2.rm16, table_1.imm16] },
        { o: o_imm + 1, or: or_imm, ops: [table_2.rm32, table_1.imm32] },
        { o: o_imm + 1, or: or_imm, ops: [table_2.rm64, table_1.imm32] },
        { o: o_imm + 3, or: or_imm, ops: [table_2.rm16, table_1.imm8] },
        { o: o_imm + 3, or: or_imm, ops: [table_2.rm32, table_1.imm8] },
        { o: o_imm + 3, or: or_imm, ops: [table_2.rm64, table_1.imm8] },
        { o: o_reg, ops: [table_2.rm8, table_2.rm8], dbit: true },
        { o: o_reg + 1, ops: [table_2.rm16, table_2.rm16], dbit: true },
        { o: o_reg + 1, ops: [table_2.rm32, table_2.rm32], dbit: true },
        { o: o_reg + 1, ops: [table_2.rm64, table_2.rm64], dbit: true },
    ];
}
function tpl_not(o, or, lock) {
    if (o === void 0) { o = 0xF6; }
    if (or === void 0) { or = 2; }
    if (lock === void 0) { lock = true; }
    return [{ o: o + 1, or: or, lock: lock },
        { o: o, ops: [table_2.rm8] },
        { ops: [table_2.rm16] },
        { ops: [table_2.rm32] },
        { ops: [table_2.rm64] },
    ];
}
function tpl_sar(or, o_r, o_imm, mns) {
    if (or === void 0) { or = 7; }
    if (o_r === void 0) { o_r = 0xD0; }
    if (o_imm === void 0) { o_imm = 0xC0; }
    if (mns === void 0) { mns = null; }
    return [{ or: or, mns: mns },
        { o: o_r, ops: [table_2.rm8, 1] },
        { o: o_r + 2, ops: [table_2.rm8, o.cl], s: table_1.S.B },
        { o: o_imm, ops: [table_2.rm8, table_1.imm8] },
        { o: o_r + 1, ops: [table_2.rm16, 1] },
        { o: o_r + 3, ops: [table_2.rm16, o.cl], s: table_1.S.W },
        { o: o_imm + 1, ops: [table_2.rm16, table_1.imm8] },
        { o: o_r + 1, ops: [table_2.rm32, 1] },
        { o: o_r + 1, ops: [table_2.rm64, 1] },
        { o: o_r + 3, ops: [table_2.rm32, o.cl], s: table_1.S.D },
        { o: o_r + 3, ops: [table_2.rm64, o.cl], s: table_1.S.Q },
        { o: o_imm + 1, ops: [table_2.rm32, table_1.imm8] },
        { o: o_imm + 1, ops: [table_2.rm64, table_1.imm8] },
    ];
}
function tpl_shrd(op) {
    if (op === void 0) { op = 0x0FAC; }
    return [{},
        { o: op, ops: [table_2.rm16, table_2.r16, table_1.imm8] },
        { o: op + 1, ops: [table_2.rm16, table_2.r16, o.cl], s: table_1.S.W },
        { o: op, ops: [table_2.rm32, table_2.r32, table_1.imm8] },
        { o: op, ops: [table_2.rm64, table_2.r64, table_1.imm8] },
        { o: op + 1, ops: [table_2.rm32, table_2.r32, o.cl], s: table_1.S.D },
        { o: op + 1, ops: [table_2.rm64, table_2.r64, o.cl], s: table_1.S.Q },
    ];
}
function tpl_bt(o_r, or_imm, o_imm) {
    if (o_r === void 0) { o_r = 0x0FA3; }
    if (or_imm === void 0) { or_imm = 4; }
    if (o_imm === void 0) { o_imm = 0x0FBA; }
    return [{},
        { o: o_r, ops: [table_2.rm16, table_2.r16] },
        { o: o_r, ops: [table_2.rm32, table_2.r32] },
        { o: o_r, ops: [table_2.rm64, table_2.r64] },
        { o: o_imm, or: or_imm, ops: [table_2.rm16, table_1.imm8] },
        { o: o_imm, or: or_imm, ops: [table_2.rm32, table_1.imm8] },
        { o: o_imm, or: or_imm, ops: [table_2.rm64, table_1.imm8] },
    ];
}
function tpl_bsf(op) {
    if (op === void 0) { op = 0x0FBC; }
    return [{},
        { o: op, ops: [table_2.r16, table_2.rm16] },
        { o: op, ops: [table_2.r32, table_2.rm32] },
        { o: op, ops: [table_2.r64, table_2.rm64] },
    ];
}
function tpl_ja(op, op2) {
    if (op === void 0) { op = 0x77; }
    if (op2 === void 0) { op2 = 0x0F87; }
    return [{},
        { o: op, ops: [table_1.rel8] },
        { o: op2, ops: [table_1.rel32] },
    ];
}
function tpl_cmovc(op, mns) {
    if (op === void 0) { op = 0x0F42; }
    if (mns === void 0) { mns = null; }
    return [{ o: op, mns: mns },
        { ops: [table_2.r16, table_2.rm16] },
        { ops: [table_2.r32, table_2.rm32] },
        { ops: [table_2.r64, table_2.rm64] },
    ];
}
function tpl_xadd(op, lock) {
    if (op === void 0) { op = 0; }
    if (lock === void 0) { lock = true; }
    return [{ o: op + 1, lock: lock },
        { o: op, ops: [table_2.rm8, table_2.r8] },
        { ops: [table_2.rm16, table_2.r16] },
        { ops: [table_2.rm32, table_2.r32] },
        { ops: [table_2.rm64, table_2.r64] },
    ];
}
function tpl_movs(op) {
    if (op === void 0) { op = 0xA4; }
    return [{ o: op + 1 },
        { o: op, s: table_1.S.B },
        { s: table_1.S.W },
        { s: table_1.S.D },
        { s: table_1.S.Q },
    ];
}
function tpl_lss(op) {
    if (op === void 0) { op = 0x0FB2; }
    return [{ o: op },
        { ops: [table_2.rm16, table_2.m] },
        { ops: [table_2.rm32, table_2.m] },
        { ops: [table_2.rm64, table_2.m] },
    ];
}
exports.table = util_1.extend({}, t.table, {
    mov: [{},
        { o: 0x88, ops: [table_2.rm8, table_2.rm8], dbit: true },
        { o: 0x89, ops: [table_2.rm16, table_2.rm16], dbit: true },
        { o: 0x89, ops: [table_2.rm32, table_2.rm32], dbit: true },
        { o: 0x89, ops: [table_2.rm64, table_2.rm64], dbit: true },
        { o: 0x8C, ops: [table_2.rm16, table_2.sreg], s: table_1.S.W },
        { o: 0x8E, ops: [table_2.sreg, table_2.rm16], s: table_1.S.W },
        { o: 0x8C, ops: [table_2.rm64, table_2.sreg], s: table_1.S.W },
        { o: 0x8E, ops: [table_2.sreg, table_2.rm64], s: table_1.S.W },
        { o: 0xB0, r: true, ops: [table_2.r8, table_1.imm8] },
        { o: 0xB8, r: true, ops: [table_2.r16, table_1.imm16] },
        { o: 0xB8, r: true, ops: [table_2.r32, table_1.imm32] },
        { o: 0xB8, r: true, ops: [table_2.r64, table_1.imm64] },
        { o: 0xC6, or: 0, ops: [table_2.rm8, table_1.imm8] },
        { o: 0xC7, or: 0, ops: [table_2.rm16, table_1.imm16] },
        { o: 0xC7, or: 0, ops: [table_2.rm32, table_1.imm32] },
        { o: 0xC7, or: 0, ops: [table_2.rm64, table_1.imm32] },
    ],
    movabs: [{},
        { o: 0xA0, ops: [o.al, table_1.imm8] },
        { o: 0xA1, ops: [o.ax, table_1.imm16] },
        { o: 0xA1, ops: [o.eax, table_1.imm32] },
        { o: 0xA1, ops: [o.rax, table_1.imm64] },
        { o: 0xA2, ops: [table_1.imm8, o.al] },
        { o: 0xA3, ops: [table_1.imm16, o.ax] },
        { o: 0xA3, ops: [table_1.imm32, o.eax] },
        { o: 0xA3, ops: [table_1.imm64, o.rax] },
    ],
    cmove: tpl_cmovc(0x0F44, ['cmovz']),
    cmovne: tpl_cmovc(0x0F45, ['cmovnz']),
    cmova: tpl_cmovc(0x0F47, ['cmovnbe']),
    cmovae: tpl_cmovc(0x0F43, ['cmovnb']),
    cmovb: tpl_cmovc(0x0F42, ['cmovnae']),
    cmovbe: tpl_cmovc(0x0F46, ['cmovna']),
    cmovg: tpl_cmovc(0x0F4F, ['cmovnle']),
    cmovge: tpl_cmovc(0x0F4D, ['cmovnl']),
    cmovl: tpl_cmovc(0x0F4C, ['cmovnge']),
    cmovle: tpl_cmovc(0x0F4E, ['cmovng']),
    cmovc: tpl_cmovc(),
    cmovnc: tpl_cmovc(0x0F43),
    cmovo: tpl_cmovc(0x0F40),
    cmovno: tpl_cmovc(0x0F41),
    cmovs: tpl_cmovc(0x0F48),
    cmovns: tpl_cmovc(0x0F4B),
    cmovp: tpl_cmovc(0x0F4A, ['cmovpe']),
    cmovnp: tpl_cmovc(0x0F4B, ['cmovpo']),
    xchg: [{},
        { o: 0x90, r: true, ops: [o.ax, table_2.r16] },
        { o: 0x90, r: true, ops: [table_2.r16, o.ax] },
        { o: 0x90, r: true, ops: [o.eax, table_2.r32] },
        { o: 0x90, r: true, ops: [o.rax, table_2.r64] },
        { o: 0x90, r: true, ops: [table_2.r32, o.eax] },
        { o: 0x90, r: true, ops: [table_2.r64, o.rax] },
        { o: 0x86, ops: [table_2.rm8, table_2.rm8] },
        { o: 0x87, ops: [table_2.rm16, table_2.rm16] },
        { o: 0x87, ops: [table_2.rm32, table_2.rm32] },
        { o: 0x87, ops: [table_2.rm64, table_2.rm64] },
    ],
    bswap: [{},
        { o: 0x0FC8, r: true, ops: [table_2.r32] },
        { o: 0x0FC8, r: true, ops: [table_2.r64] },
    ],
    xadd: tpl_xadd(0x0FC0),
    cmpxchg: tpl_xadd(0x0FB0),
    cmpxchg8b: [{ o: 0x0FC7, or: 1, ops: [table_2.m], s: table_1.S.Q }],
    cmpxchg16b: [{ o: 0x0FC7, or: 1, ops: [table_2.m], s: table_1.S.O }],
    push: [{ ds: table_1.S.Q },
        { o: 0xFF, or: 6, ops: [table_2.rm16] },
        { o: 0xFF, or: 6, ops: [table_2.rm64] },
        { o: 0x50, r: true, ops: [table_2.r16] },
        { o: 0x50, r: true, ops: [table_2.r64] },
        { o: 0x6A, ops: [table_1.imm8] },
        { o: 0x68, ops: [table_1.imm16] },
        { o: 0x68, ops: [table_1.imm32] },
        { o: 0x0FA0, ops: [o.fs] },
        { o: 0x0FA8, ops: [o.gs] },
    ],
    pop: [{ ds: table_1.S.Q },
        { o: 0x8F, or: 0, ops: [table_2.rm16] },
        { o: 0x8F, or: 0, ops: [table_2.rm64] },
        { o: 0x58, r: true, ops: [table_2.rm16] },
        { o: 0x58, r: true, ops: [table_2.rm64] },
        { o: 0x0FA1, ops: [o.fs], s: table_1.S.W },
        { o: 0x0FA1, ops: [o.fs], s: table_1.S.Q },
        { o: 0x0FA9, ops: [o.gs], s: table_1.S.W },
        { o: 0x0FA9, ops: [o.gs], s: table_1.S.W },
    ],
    cwd: [{ o: 0x99, s: table_1.S.W }],
    cdq: [{ o: 0x99, s: table_1.S.D }],
    cqo: [{ o: 0x99, s: table_1.S.Q }],
    cbw: [{ o: 0x98, s: table_1.S.W }],
    cwde: [{ o: 0x98, s: table_1.S.D }],
    cdqe: [{ o: 0x98, s: table_1.S.Q }],
    movsx: [{},
        { o: 0x0FBE, ops: [table_2.r16, table_2.rm8], s: table_1.S.W },
        { o: 0x0FBE, ops: [table_2.r32, table_2.rm8], s: table_1.S.D },
        { o: 0x0FBE, ops: [table_2.r64, table_2.rm8], s: table_1.S.Q },
        { o: 0x0FBF, ops: [table_2.r32, table_2.rm16], s: table_1.S.D },
        { o: 0x0FBF, ops: [table_2.r64, table_2.rm16], s: table_1.S.Q },
        { o: 0x0FBF, ops: [table_2.r64, table_2.rm32], s: table_1.S.Q },
    ],
    movzx: [{},
        { o: 0x0FB6, ops: [table_2.r16, table_2.rm8], s: table_1.S.W },
        { o: 0x0FB6, ops: [table_2.r32, table_2.rm8], s: table_1.S.D },
        { o: 0x0FB6, ops: [table_2.r64, table_2.rm8], s: table_1.S.Q },
        { o: 0x0FB7, ops: [table_2.r32, table_2.rm16], s: table_1.S.D },
        { o: 0x0FB7, ops: [table_2.r64, table_2.rm16], s: table_1.S.Q },
    ],
    adcx: [{ o: 0x0F38F6, pfx: [0x66], ops: [table_2.r64, table_2.rm64] }],
    adox: [{ o: 0x0F38F6, pfx: [0xF3], ops: [table_2.r64, table_2.rm64] }],
    add: tpl_and(0x04, 0x80, 0, 0x00),
    adc: tpl_and(0x14, 0x80, 2, 0x10),
    sub: tpl_and(0x2C, 0x80, 5, 0x28),
    sbb: tpl_and(0x1C, 0x80, 3, 0x18),
    imul: [{},
        { o: 0xF6, or: 5, ops: [table_2.rm8] },
        { o: 0xF7, or: 5, ops: [table_2.rm16] },
        { o: 0xF7, or: 5, ops: [table_2.rm32] },
        { o: 0xF7, or: 5, ops: [table_2.rm64] },
        { o: 0x0FAF, ops: [table_2.r16, table_2.rm16] },
        { o: 0x0FAF, ops: [table_2.r32, table_2.rm32] },
        { o: 0x0FAF, ops: [table_2.r64, table_2.rm64] },
        { o: 0x6B, ops: [table_2.r16, table_2.rm16, table_1.imm8] },
        { o: 0x6B, ops: [table_2.r32, table_2.rm32, table_1.imm8] },
        { o: 0x6B, ops: [table_2.r64, table_2.rm64, table_1.imm8] },
        { o: 0x69, ops: [table_2.r16, table_2.rm16, table_1.imm16] },
        { o: 0x69, ops: [table_2.r32, table_2.rm32, table_1.imm32] },
        { o: 0x69, ops: [table_2.r64, table_2.rm64, table_1.imm32] },
    ],
    mul: tpl_not(0xF6, 4, false),
    idiv: tpl_not(0xF6, 7, false),
    div: tpl_not(0xF6, 6, false),
    inc: tpl_not(0xFE, 0),
    dec: tpl_not(0xFE, 1),
    neg: tpl_not(0xF6, 3),
    cmp: tpl_and(0x3C, 0x80, 7, 0x38, false),
    and: tpl_and(),
    or: tpl_and(0x0C, 0x80, 1, 0x08),
    xor: tpl_and(0x34, 0x80, 6, 0x30),
    not: tpl_not(),
    sar: tpl_sar(),
    shr: tpl_sar(5),
    shl: tpl_sar(4, 0xD0, 0xC0, ['sal']),
    shrd: tpl_shrd(),
    shld: tpl_shrd(0x0FA4),
    ror: tpl_sar(1),
    rol: tpl_sar(0),
    rcr: tpl_sar(3),
    rcl: tpl_sar(2),
    bt: tpl_bt(),
    bts: tpl_bt(0x0FAB, 4),
    btr: tpl_bt(0x0FB3, 6),
    btc: tpl_bt(0x0FBB, 7),
    bsf: tpl_bsf(),
    bsr: tpl_bsf(0x0FBD),
    sete: [{ o: 0x0F94, ops: [table_2.rm8], mns: ['setz'] }],
    setne: [{ o: 0x0F95, ops: [table_2.rm8], mns: ['setnz'] }],
    seta: [{ o: 0x0F97, ops: [table_2.rm8], mns: ['setnbe'] }],
    setae: [{ o: 0x0F93, ops: [table_2.rm8], mns: ['setnb', 'setnc'] }],
    setb: [{ o: 0x0F92, ops: [table_2.rm8], mns: ['setnae', 'setc'] }],
    setbe: [{ o: 0x0F96, ops: [table_2.rm8], mns: ['setna'] }],
    setg: [{ o: 0x0F9F, ops: [table_2.rm8], mns: ['setnle'] }],
    setge: [{ o: 0x0F9D, ops: [table_2.rm8], mns: ['setnl'] }],
    setl: [{ o: 0x0F9C, ops: [table_2.rm8], mns: ['setnge'] }],
    setle: [{ o: 0x0F9E, ops: [table_2.rm8], mns: ['setng'] }],
    sets: [{ o: 0x0F98, ops: [table_2.rm8] }],
    setns: [{ o: 0x0F99, ops: [table_2.rm8] }],
    seto: [{ o: 0x0F90, ops: [table_2.rm8] }],
    setno: [{ o: 0x0F91, ops: [table_2.rm8] }],
    setp: [{ o: 0x0F9A, ops: [table_2.rm8], mns: ['setpe'] }],
    setnp: [{ o: 0x0F9B, ops: [table_2.rm8], mns: ['setpo'] }],
    test: [{},
        { o: 0xA8, ops: [o.al, table_1.imm8] },
        { o: 0xA9, ops: [o.ax, table_1.imm16] },
        { o: 0xA9, ops: [o.eax, table_1.imm32] },
        { o: 0xA9, ops: [o.rax, table_1.imm32] },
        { o: 0xF6, or: 0, ops: [table_2.rm8, table_1.imm8] },
        { o: 0xF7, or: 0, ops: [table_2.rm16, table_1.imm16] },
        { o: 0xF7, or: 0, ops: [table_2.rm32, table_1.imm32] },
        { o: 0xF7, or: 0, ops: [table_2.rm64, table_1.imm32] },
        { o: 0x84, ops: [table_2.rm8, table_2.r8] },
        { o: 0x85, ops: [table_2.rm16, table_2.r16] },
        { o: 0x85, ops: [table_2.rm32, table_2.r32] },
        { o: 0x85, ops: [table_2.rm64, table_2.r64] },
    ],
    crc32: [{ pfx: [0xF2] },
        { o: 0x0F38F0, ops: [table_2.r32, table_2.rm8], s: table_1.S.D },
        { o: 0x0F38F1, ops: [table_2.r32, table_2.rm16], s: table_1.S.D },
        { o: 0x0F38F1, ops: [table_2.r32, table_2.rm32], s: table_1.S.D },
        { o: 0x0F38F0, ops: [table_2.r64, table_2.rm8], s: table_1.S.Q },
        { o: 0x0F38F1, ops: [table_2.r64, table_2.rm64] },
    ],
    popcnt: [{ pfx: [0xF3] },
        { o: 0x0FB8, ops: [table_2.r16, table_2.rm16], s: table_1.S.W },
        { o: 0x0FB8, ops: [table_2.r32, table_2.rm32], s: table_1.S.D },
        { o: 0x0FB8, ops: [table_2.r64, table_2.rm64], s: table_1.S.Q },
    ],
    jmp: [{ ds: table_1.S.Q },
        { o: 0xEB, ops: [table_1.rel8] },
        { o: 0xE9, ops: [table_1.rel32] },
        { o: 0xFF, or: 4, ops: [table_2.rm64] },
    ],
    ljmp: [{ ds: table_1.S.Q },
        { o: 0xFF, or: 5, ops: [table_2.m], s: table_1.S.Q },
    ],
    jecxz: [{ o: 0xE3, ops: [table_1.rel8], pfx: [0x67] }],
    jrcxz: [{ o: 0xE3, ops: [table_1.rel8] }],
    ja: tpl_ja(),
    jae: tpl_ja(0x73, 0x0F83),
    jb: tpl_ja(0x72, 0x0F82),
    jbe: tpl_ja(0x76, 0x0F86),
    jc: tpl_ja(0x72, 0x0F82),
    je: tpl_ja(0x74, 0x0F84),
    jg: tpl_ja(0x7F, 0x0F8F),
    jge: tpl_ja(0x7D, 0x0F8D),
    jl: tpl_ja(0x7C, 0x0F8C),
    jle: tpl_ja(0x7E, 0x0F8E),
    jna: tpl_ja(0x76, 0x0F86),
    jnae: tpl_ja(0x72, 0x0F82),
    jnb: tpl_ja(0x73, 0x0F83),
    jnbe: tpl_ja(0x77, 0x0F87),
    jnc: tpl_ja(0x73, 0x0F83),
    jne: tpl_ja(0x75, 0x0F85),
    jng: tpl_ja(0x7E, 0x0F8E),
    jnge: tpl_ja(0x7C, 0x0F8C),
    jnl: tpl_ja(0x7D, 0x0F8D),
    jnle: tpl_ja(0x7F, 0x0F8F),
    jno: tpl_ja(0x71, 0x0F81),
    jnp: tpl_ja(0x7B, 0x0F8B),
    jns: tpl_ja(0x79, 0x0F89),
    jnz: tpl_ja(0x75, 0x0F85),
    jo: tpl_ja(0x70, 0x0F80),
    jp: tpl_ja(0x7A, 0x0F8A),
    jpe: tpl_ja(0x7A, 0x0F8A),
    jpo: tpl_ja(0x7B, 0x0F8B),
    js: tpl_ja(0x78, 0x0F88),
    jz: tpl_ja(0x74, 0x0F84),
    loop: [{ o: 0xE2, ops: [table_1.rel8] }],
    loope: [{ o: 0xE1, ops: [table_1.rel8], mns: ['loopz'] }],
    loopne: [{ o: 0xE0, ops: [table_1.rel8], mns: ['loopnz'] }],
    call: [{ ds: table_1.S.Q },
        { o: 0xE8, ops: [table_1.rel32] },
        { o: 0xFF, or: 2, ops: [table_2.rm64] },
    ],
    lcall: [{ ds: table_1.S.Q },
        { o: 0xFF, or: 3, ops: [table_2.m], s: table_1.S.D },
    ],
    ret: [{ ds: table_1.S.Q },
        { o: 0xC3 },
        { o: 0xC2, ops: [table_1.imm16] }
    ],
    lret: [{ ds: table_1.S.Q },
        { o: 0xCB },
        { o: 0xCA, ops: [table_1.imm16] }
    ],
    iret: [{ o: 0xCF }
    ],
    movs: tpl_movs(),
    cmps: tpl_movs(0xA6),
    scas: tpl_movs(0xAE),
    lods: tpl_movs(0xAC),
    stos: tpl_movs(0xAA),
    'in': [{ mr: false },
        { o: 0xE4, ops: [o.al, table_1.imm8] },
        { o: 0xE5, ops: [o.ax, table_1.imm8] },
        { o: 0xE5, ops: [o.eax, table_1.imm8] },
        { o: 0xEC, ops: [o.al, o.dx], s: table_1.S.B },
        { o: 0xED, ops: [o.ax, o.dx], s: table_1.S.W },
        { o: 0xED, ops: [o.eax, o.dx], s: table_1.S.D },
    ],
    out: [{ mr: false },
        { o: 0xE6, ops: [table_1.imm8, o.al] },
        { o: 0xE7, ops: [table_1.imm8, o.ax] },
        { o: 0xE7, ops: [table_1.imm8, o.eax] },
        { o: 0xEE, ops: [o.dx, o.al], s: table_1.S.B },
        { o: 0xEF, ops: [o.dx, o.ax], s: table_1.S.W },
        { o: 0xEF, ops: [o.dx, o.eax], s: table_1.S.D },
    ],
    ins: [{ o: 0x6D },
        { o: 0x6C, s: table_1.S.B },
        { s: table_1.S.W },
        { s: table_1.S.D },
    ],
    outs: [{ o: 0x6F },
        { o: 0x6E, s: table_1.S.B },
        { s: table_1.S.W },
        { s: table_1.S.D },
    ],
    enter: [{},
        { o: 0xC8, ops: [table_1.imm16, table_1.imm8] },
    ],
    leave: [{ o: 0xC9 },
        { s: table_1.S.W },
        { s: table_1.S.Q },
    ],
    stc: [{ o: 0xF9 }],
    clc: [{ o: 0xF8 }],
    cmc: [{ o: 0xF5 }],
    cld: [{ o: 0xFC }],
    std: [{ o: 0xFD }],
    pushf: [{ o: 0x9C }],
    popf: [{ o: 0x9D }],
    sti: [{ o: 0xFB }],
    cli: [{ o: 0xFA }],
    lfs: tpl_lss(0x0FB4),
    lgs: tpl_lss(0x0FB5),
    lss: tpl_lss(),
    lea: [{ o: 0x8D },
        { ops: [table_2.r64, table_2.m] },
        { ops: [table_2.r32, table_2.m] },
        { ops: [table_2.r16, table_2.m] },
    ],
    nop: [{},
        { o: 0x90 },
        { o: 0x0F1F, or: 0, ops: [table_2.rm16] },
        { o: 0x0F1F, or: 0, ops: [table_2.rm32] },
    ],
    ud2: [{ o: 0x0F0B }],
    xlat: [{ o: 0xD7 }],
    cpuid: [{ o: 0x0FA2 }],
    movbe: [{},
        { o: 0x0F38F0, ops: [table_2.r16, table_2.m16] },
        { o: 0x0F38F0, ops: [table_2.r32, table_2.m32] },
        { o: 0x0F38F0, ops: [table_2.r64, table_2.m64] },
        { o: 0x0F38F1, ops: [table_2.m16, table_2.r16] },
        { o: 0x0F38F1, ops: [table_2.m32, table_2.r32] },
        { o: 0x0F38F1, ops: [table_2.m64, table_2.r64] },
    ],
    prefetchw: [{ o: 0x0F0D, or: 1, ops: [table_2.m] }],
    prefetchwt1: [{ o: 0x0F0D, or: 2, ops: [table_2.m] }],
    cflush: [{ o: 0x0FAE, or: 7, ops: [table_2.m] }],
    cflushopt: [{ o: 0x0FAE, or: 7, pfx: [0x66], ops: [table_2.m] }],
    xsave: [{ o: 0x0FAE, or: 4, ops: [table_2.m] }],
    xsavec: [{ o: 0x0FC7, or: 4, ops: [table_2.m] }],
    xsaveopt: [{ o: 0x0FAE, or: 6, ops: [table_2.m] }],
    xrstor: [{ o: 0x0FAE, or: 5, ops: [table_2.m] }],
    xgetbv: [{ o: 0x0F01D0 }],
    rdrand: [{ o: 0x0FC7, or: 6 },
        { ops: [table_2.r16] },
        { ops: [table_2.r32] },
        { ops: [table_2.r64] },
    ],
    rdseed: [{ o: 0x0FC7, or: 7 },
        { ops: [table_2.r16] },
        { ops: [table_2.r32] },
        { ops: [table_2.r64] },
    ],
    syscall: [{ o: 0x0F05 }],
    sysret: [{ o: 0x0F07 }],
    sysenter: [{ o: 0x0F34 }],
    sysexit: [{ o: 0x0F35 }],
});
