"use strict";
var operand_1 = require('./operand');
exports.S = operand_1.SIZE;
// Operands
exports.r = operand_1.Register;
exports.m = operand_1.Memory;
exports.imm = operand_1.Immediate;
exports.immu = operand_1.ImmediateUnsigned;
exports.imm8 = operand_1.Immediate8;
exports.immu8 = operand_1.ImmediateUnsigned8;
exports.imm16 = operand_1.Immediate16;
exports.immu16 = operand_1.ImmediateUnsigned16;
exports.imm32 = operand_1.Immediate32;
exports.immu32 = operand_1.ImmediateUnsigned32;
exports.imm64 = operand_1.Immediate64;
exports.immu64 = operand_1.ImmediateUnsigned64;
exports.rel = operand_1.Relative;
exports.rel8 = operand_1.Relative8;
exports.rel16 = operand_1.Relative16;
exports.rel32 = operand_1.Relative32;
// Global defaults
exports.defaults = { o: 0x00, mn: '', s: exports.S.NONE, ops: null };
