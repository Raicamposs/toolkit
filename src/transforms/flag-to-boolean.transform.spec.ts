import { FlagToBooleanTransform } from './flag-to-boolean.transform';

import { describe, expect, it } from 'vitest';
describe('FlagToBooleanTransform', () => {
  it('should return True', () => {
    expect(FlagToBooleanTransform.execute(undefined, true)).toBeTruthy();
    expect(FlagToBooleanTransform.execute(null, true)).toBeTruthy();
    expect(FlagToBooleanTransform.execute(true)).toBeTruthy();

    expect(FlagToBooleanTransform.execute('S')).toBeTruthy();
    expect(FlagToBooleanTransform.execute('SIM')).toBeTruthy();
    expect(FlagToBooleanTransform.execute('TRUE')).toBeTruthy();
    expect(FlagToBooleanTransform.execute('T')).toBeTruthy();

    expect(FlagToBooleanTransform.execute(' S ')).toBeTruthy();
    expect(FlagToBooleanTransform.execute(' SIM ')).toBeTruthy();
    expect(FlagToBooleanTransform.execute(' TRUE ')).toBeTruthy();
    expect(FlagToBooleanTransform.execute(' T ')).toBeTruthy();

    expect(FlagToBooleanTransform.execute('s')).toBeTruthy();
    expect(FlagToBooleanTransform.execute('sim')).toBeTruthy();
    expect(FlagToBooleanTransform.execute('true')).toBeTruthy();
    expect(FlagToBooleanTransform.execute('t')).toBeTruthy();

    expect(FlagToBooleanTransform.execute(9 as any, true)).toBeTruthy();
    expect(FlagToBooleanTransform.execute('ssss' as any, true)).toBeTruthy();
    expect(FlagToBooleanTransform.execute({} as any, true)).toBeTruthy();
    expect(FlagToBooleanTransform.execute([] as any, true)).toBeTruthy();
  });
  it('should return False', () => {
    expect(FlagToBooleanTransform.execute(undefined, false)).toBeFalsy();
    expect(FlagToBooleanTransform.execute(null, false)).toBeFalsy();
    expect(FlagToBooleanTransform.execute(false)).toBeFalsy();

    expect(FlagToBooleanTransform.execute('N')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('NÃO')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('NAO')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('FALSE')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('F')).toBeFalsy();

    expect(FlagToBooleanTransform.execute(' N ')).toBeFalsy();
    expect(FlagToBooleanTransform.execute(' NÃO ')).toBeFalsy();
    expect(FlagToBooleanTransform.execute(' NAO ')).toBeFalsy();
    expect(FlagToBooleanTransform.execute(' FALSE ')).toBeFalsy();
    expect(FlagToBooleanTransform.execute(' F ')).toBeFalsy();

    expect(FlagToBooleanTransform.execute('n')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('não')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('nao')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('false')).toBeFalsy();
    expect(FlagToBooleanTransform.execute('f')).toBeFalsy();

    expect(FlagToBooleanTransform.execute(9 as any, false)).toBeFalsy();
    expect(FlagToBooleanTransform.execute('ssss' as any, false)).toBeFalsy();
    expect(FlagToBooleanTransform.execute({} as any, false)).toBeFalsy();
    expect(FlagToBooleanTransform.execute([] as any, false)).toBeFalsy();
  });
  it('should return S', () => {
    expect(FlagToBooleanTransform.reverse(undefined, 'S')).toBe('S');
    expect(FlagToBooleanTransform.reverse(null, 'S')).toBe('S');

    expect(FlagToBooleanTransform.reverse(true)).toBe('S');
    expect(FlagToBooleanTransform.reverse(true, 'N')).toBe('S');

    expect(FlagToBooleanTransform.reverse('S')).toBe('S');
    expect(FlagToBooleanTransform.reverse('SIM')).toBe('S');
    expect(FlagToBooleanTransform.reverse('TRUE')).toBe('S');
    expect(FlagToBooleanTransform.reverse('T')).toBe('S');

    expect(FlagToBooleanTransform.reverse(' S ')).toBe('S');
    expect(FlagToBooleanTransform.reverse(' SIM ')).toBe('S');
    expect(FlagToBooleanTransform.reverse(' TRUE ')).toBe('S');
    expect(FlagToBooleanTransform.reverse(' T ')).toBe('S');

    expect(FlagToBooleanTransform.reverse('s')).toBe('S');
    expect(FlagToBooleanTransform.reverse('sim')).toBe('S');
    expect(FlagToBooleanTransform.reverse('true')).toBe('S');
    expect(FlagToBooleanTransform.reverse('t')).toBe('S');

    expect(FlagToBooleanTransform.reverse(9 as any, 'S')).toBe('S');
    expect(FlagToBooleanTransform.reverse('ssss' as any, 'S')).toBe('S');
    expect(FlagToBooleanTransform.reverse({} as any, 'S')).toBe('S');
    expect(FlagToBooleanTransform.reverse([] as any, 'S')).toBe('S');
  });

  it('should return N', () => {
    expect(FlagToBooleanTransform.reverse(undefined, 'N')).toBe('N');
    expect(FlagToBooleanTransform.reverse(null, 'N')).toBe('N');
    expect(FlagToBooleanTransform.reverse(null, 'N')).toBe('N');

    expect(FlagToBooleanTransform.reverse(false)).toBe('N');
    expect(FlagToBooleanTransform.reverse(false, 'S')).toBe('N');

    expect(FlagToBooleanTransform.reverse('N')).toBe('N');
    expect(FlagToBooleanTransform.reverse('NÃO')).toBe('N');
    expect(FlagToBooleanTransform.reverse('NAO')).toBe('N');
    expect(FlagToBooleanTransform.reverse('FALSE')).toBe('N');
    expect(FlagToBooleanTransform.reverse('F')).toBe('N');

    expect(FlagToBooleanTransform.reverse(' N ')).toBe('N');
    expect(FlagToBooleanTransform.reverse(' NÃO ')).toBe('N');
    expect(FlagToBooleanTransform.reverse(' NAO ')).toBe('N');
    expect(FlagToBooleanTransform.reverse(' FALSE ')).toBe('N');
    expect(FlagToBooleanTransform.reverse(' F ')).toBe('N');

    expect(FlagToBooleanTransform.reverse('n')).toBe('N');
    expect(FlagToBooleanTransform.reverse('não')).toBe('N');
    expect(FlagToBooleanTransform.reverse('nao')).toBe('N');
    expect(FlagToBooleanTransform.reverse('false')).toBe('N');
    expect(FlagToBooleanTransform.reverse('f')).toBe('N');

    expect(FlagToBooleanTransform.reverse(9 as any, 'N')).toBe('N');
    expect(FlagToBooleanTransform.reverse('ssss' as any, 'N')).toBe('N');
    expect(FlagToBooleanTransform.reverse({} as any, 'N')).toBe('N');
    expect(FlagToBooleanTransform.reverse([] as any, 'N')).toBe('N');
  });
});
