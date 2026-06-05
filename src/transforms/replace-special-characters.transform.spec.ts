import { ReplaceSpecialCharacters } from './replace-special-characters.transform';

import { describe, expect, it } from 'vitest';
describe('ReplaceSpecialCharacters', () => {
  it('should remove special characters from upper case string', () => {
    expect(ReplaceSpecialCharacters('ÁÀÂÃ')).toBe('AAAA');
    expect(ReplaceSpecialCharacters('ÉÈÊ')).toBe('EEE');
    expect(ReplaceSpecialCharacters('ÍÌÎ')).toBe('III');
    expect(ReplaceSpecialCharacters('ÓÒÔÕ')).toBe('OOOO');
    expect(ReplaceSpecialCharacters('ÚÙÛ')).toBe('UUU');
    expect(ReplaceSpecialCharacters('Ç')).toBe('C');
  });

  it('should remove special characters from lower case string', () => {
    expect(ReplaceSpecialCharacters('áàâã')).toBe('aaaa');
    expect(ReplaceSpecialCharacters('éèê')).toBe('eee');
    expect(ReplaceSpecialCharacters('íìî')).toBe('iii');
    expect(ReplaceSpecialCharacters('óòôõ')).toBe('oooo');
    expect(ReplaceSpecialCharacters('úùû')).toBe('uuu');
    expect(ReplaceSpecialCharacters('ç')).toBe('c');
  });

  it('should not change case from text', () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting';
    expect(ReplaceSpecialCharacters(text)).toBe(text);

    expect(ReplaceSpecialCharacters('Entre doidos e doídos, prefiro não acentuar')).toBe(
      'Entre doidos e doidos, prefiro nao acentuar'
    );
  });
});
