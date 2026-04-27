export const isValidCPF = (cpf: string): boolean => {
    const digits = cpf.replace(/\D/g, "");

    if (digits.length !== 11) return false;

    if (/^(\d)\1+$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(digits[i]) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;

    if (firstDigit !== Number(digits[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number(digits[i]) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;

    return secondDigit === Number(digits[10]);
};

export const isValidCNPJ = (cnpj: string): boolean => {
    const digits = cnpj.replace(/\D/g, "");

    if (digits.length !== 14) return false;
    if (/^(\d)\1+$/.test(digits)) return false;

    const calcDigit = (base: string, weights: number[]) => {
        const sum = base
        .split("")
        .reduce((acc, num, i) => acc + Number(num) * weights[i], 0);

        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const base12 = digits.slice(0, 12);

    const digit1 = calcDigit(base12, [5,4,3,2,9,8,7,6,5,4,3,2]);
    const digit2 = calcDigit(base12 + digit1, [6,5,4,3,2,9,8,7,6,5,4,3,2]);

    return digits === base12 + digit1 + digit2;
};