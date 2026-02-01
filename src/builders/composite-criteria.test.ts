import { describe, expect, it } from 'vitest';
import { CompositeCriteria, Criteria, OrCriteria } from './composite-criteria';

// Mock criteria implementations for testing
class AgeCriteria implements Criteria<Person> {
  constructor(private minAge: number) {}

  matching(data: Person[]): Person[] {
    return data.filter((person) => person.age >= this.minAge);
  }
}

class NameCriteria implements Criteria<Person> {
  constructor(private name: string) {}

  matching(data: Person[]): Person[] {
    return data.filter((person) => person.name === this.name);
  }
}

class ActiveCriteria implements Criteria<Person> {
  matching(data: Person[]): Person[] {
    return data.filter((person) => person.isActive);
  }
}

class PremiumCriteria implements Criteria<Person> {
  matching(data: Person[]): Person[] {
    return data.filter((person) => person.isPremium);
  }
}

interface Person {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  isPremium: boolean;
}

describe('CompositeCriteria', () => {
  const people: Person[] = [
    { id: 1, name: 'Alice', age: 25, isActive: true, isPremium: true },
    { id: 2, name: 'Bob', age: 17, isActive: true, isPremium: false },
    { id: 3, name: 'Charlie', age: 30, isActive: false, isPremium: true },
    { id: 4, name: 'Diana', age: 22, isActive: true, isPremium: true },
    { id: 5, name: 'Eve', age: 16, isActive: false, isPremium: false },
  ];

  describe('add', () => {
    it('deve adicionar um critério e retornar this para encadeamento', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);

      const result = composite.add(ageCriteria);

      expect(result).toBe(composite);
    });

    it('deve permitir adicionar múltiplos critérios via encadeamento', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);
      const activeCriteria = new ActiveCriteria();

      const result = composite.add(ageCriteria).add(activeCriteria);

      expect(result).toBe(composite);
    });
  });

  describe('matching', () => {
    it('deve retornar todos os itens quando nenhum critério foi adicionado', () => {
      const composite = new CompositeCriteria<Person>();

      const result = composite.matching(people);

      expect(result).toEqual(people);
      expect(result).toHaveLength(5);
    });

    it('deve aplicar um único critério', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);

      composite.add(ageCriteria);
      const result = composite.matching(people);

      expect(result).toHaveLength(3);
      expect(result.map((p) => p.name)).toEqual(['Alice', 'Charlie', 'Diana']);
    });

    it('deve aplicar múltiplos critérios em sequência (AND lógico)', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);
      const activeCriteria = new ActiveCriteria();

      composite.add(ageCriteria).add(activeCriteria);
      const result = composite.matching(people);

      // Deve retornar apenas pessoas com idade >= 18 E ativas
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.name)).toEqual(['Alice', 'Diana']);
    });

    it('deve aplicar três critérios em sequência', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);
      const activeCriteria = new ActiveCriteria();
      const premiumCriteria = new PremiumCriteria();

      composite.add(ageCriteria).add(activeCriteria).add(premiumCriteria);
      const result = composite.matching(people);

      // Deve retornar apenas pessoas com idade >= 18 E ativas E premium
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.name)).toEqual(['Alice', 'Diana']);
    });

    it('deve retornar array vazio quando nenhum item corresponde aos critérios', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(100); // Ninguém tem 100 anos

      composite.add(ageCriteria);
      const result = composite.matching(people);

      expect(result).toEqual([]);
    });

    it('deve funcionar com array vazio', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);

      composite.add(ageCriteria);
      const result = composite.matching([]);

      expect(result).toEqual([]);
    });

    it('deve aplicar critérios na ordem em que foram adicionados', () => {
      const composite = new CompositeCriteria<Person>();
      const nameCriteria = new NameCriteria('Alice');
      const ageCriteria = new AgeCriteria(18);

      composite.add(nameCriteria).add(ageCriteria);
      const result = composite.matching(people);

      // Primeiro filtra por nome (Alice), depois por idade (>= 18)
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Alice');
    });
  });

  describe('Cenários Complexos', () => {
    it('deve permitir reutilizar o mesmo composite em diferentes datasets', () => {
      const composite = new CompositeCriteria<Person>();
      const ageCriteria = new AgeCriteria(18);
      const activeCriteria = new ActiveCriteria();

      composite.add(ageCriteria).add(activeCriteria);

      const result1 = composite.matching(people);
      const result2 = composite.matching(people.slice(0, 3));

      expect(result1).toHaveLength(2);
      expect(result2).toHaveLength(1);
      expect(result2[0].name).toBe('Alice');
    });

    it('deve funcionar com tipos diferentes', () => {
      interface Product {
        id: number;
        name: string;
        price: number;
        inStock: boolean;
      }

      class PriceCriteria implements Criteria<Product> {
        constructor(private maxPrice: number) {}
        matching(data: Product[]): Product[] {
          return data.filter((p) => p.price <= this.maxPrice);
        }
      }

      class InStockCriteria implements Criteria<Product> {
        matching(data: Product[]): Product[] {
          return data.filter((p) => p.inStock);
        }
      }

      const products: Product[] = [
        { id: 1, name: 'Laptop', price: 1000, inStock: true },
        { id: 2, name: 'Mouse', price: 50, inStock: true },
        { id: 3, name: 'Keyboard', price: 100, inStock: false },
      ];

      const composite = new CompositeCriteria<Product>();
      composite.add(new PriceCriteria(500)).add(new InStockCriteria());

      const result = composite.matching(products);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Mouse');
    });
  });
});

describe('OrCriteria', () => {
  const people: Person[] = [
    { id: 1, name: 'Alice', age: 25, isActive: true, isPremium: true },
    { id: 2, name: 'Bob', age: 17, isActive: true, isPremium: false },
    { id: 3, name: 'Charlie', age: 30, isActive: false, isPremium: true },
    { id: 4, name: 'Diana', age: 22, isActive: true, isPremium: true },
    { id: 5, name: 'Eve', age: 16, isActive: false, isPremium: false },
  ];

  describe('matching', () => {
    it('deve retornar itens que correspondem ao primeiro critério', () => {
      const ageCriteria = new AgeCriteria(25);
      const nameCriteria = new NameCriteria('Bob');

      const orCriteria = new OrCriteria(ageCriteria, nameCriteria);
      const result = orCriteria.matching(people);

      // Deve incluir pessoas com idade >= 25 OU nome "Bob"
      expect(result).toHaveLength(3);
      expect(result.map((p) => p.name).sort()).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('deve retornar itens que correspondem ao segundo critério', () => {
      const nameCriteria = new NameCriteria('Alice');
      const activeCriteria = new ActiveCriteria();

      const orCriteria = new OrCriteria(nameCriteria, activeCriteria);
      const result = orCriteria.matching(people);

      // Deve incluir "Alice" OU pessoas ativas
      expect(result).toHaveLength(3);
      expect(result.map((p) => p.name).sort()).toEqual(['Alice', 'Bob', 'Diana']);
    });

    it('deve retornar itens que correspondem a ambos os critérios sem duplicatas', () => {
      const ageCriteria = new AgeCriteria(18);
      const activeCriteria = new ActiveCriteria();

      const orCriteria = new OrCriteria(ageCriteria, activeCriteria);
      const result = orCriteria.matching(people);

      // Alice, Diana e Bob aparecem em ambos os critérios, mas não devem duplicar
      expect(result).toHaveLength(4);
      expect(result.map((p) => p.name).sort()).toEqual(['Alice', 'Bob', 'Charlie', 'Diana']);
    });

    it('deve retornar array vazio quando nenhum critério corresponde', () => {
      const ageCriteria = new AgeCriteria(100);
      const nameCriteria = new NameCriteria('NonExistent');

      const orCriteria = new OrCriteria(ageCriteria, nameCriteria);
      const result = orCriteria.matching(people);

      expect(result).toEqual([]);
    });

    it('deve funcionar com array vazio', () => {
      const ageCriteria = new AgeCriteria(18);
      const activeCriteria = new ActiveCriteria();

      const orCriteria = new OrCriteria(ageCriteria, activeCriteria);
      const result = orCriteria.matching([]);

      expect(result).toEqual([]);
    });

    it('deve remover duplicatas corretamente', () => {
      const premiumCriteria = new PremiumCriteria();
      const activeCriteria = new ActiveCriteria();

      const orCriteria = new OrCriteria(premiumCriteria, activeCriteria);
      const result = orCriteria.matching(people);

      // Alice e Diana são premium E ativas, mas devem aparecer apenas uma vez
      expect(result).toHaveLength(4);
      const ids = result.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length); // Verifica que não há duplicatas
    });
  });

  describe('Composição com CompositeCriteria', () => {
    it('deve funcionar como parte de um CompositeCriteria', () => {
      const ageCriteria = new AgeCriteria(20);
      const premiumCriteria = new PremiumCriteria();

      // OR: idade >= 20 OU premium
      const orCriteria = new OrCriteria(ageCriteria, premiumCriteria);

      // Composite: (idade >= 20 OU premium) E ativo
      const composite = new CompositeCriteria<Person>();
      composite.add(orCriteria).add(new ActiveCriteria());

      const result = composite.matching(people);

      // Deve retornar pessoas que são (idade >= 20 OU premium) E ativas
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.name).sort()).toEqual(['Alice', 'Diana']);
    });

    it('deve permitir OR aninhado em Composite complexo', () => {
      const youngCriteria = new AgeCriteria(18);
      const premiumCriteria = new PremiumCriteria();

      // OR: jovem (>= 18) OU premium
      const orCriteria = new OrCriteria(youngCriteria, premiumCriteria);

      // Composite: (jovem OU premium) E ativo
      const composite = new CompositeCriteria<Person>();
      composite.add(orCriteria).add(new ActiveCriteria());

      const result = composite.matching(people);

      expect(result).toHaveLength(2);
      expect(result.map((p) => p.name).sort()).toEqual(['Alice', 'Diana']);
    });
  });

  describe('Cenários Complexos', () => {
    it('deve funcionar com tipos diferentes', () => {
      interface Product {
        id: number;
        name: string;
        category: string;
        onSale: boolean;
      }

      class CategoryCriteria implements Criteria<Product> {
        constructor(private category: string) {}
        matching(data: Product[]): Product[] {
          return data.filter((p) => p.category === this.category);
        }
      }

      class OnSaleCriteria implements Criteria<Product> {
        matching(data: Product[]): Product[] {
          return data.filter((p) => p.onSale);
        }
      }

      const products: Product[] = [
        { id: 1, name: 'Laptop', category: 'Electronics', onSale: false },
        { id: 2, name: 'Shirt', category: 'Clothing', onSale: true },
        { id: 3, name: 'Phone', category: 'Electronics', onSale: true },
      ];

      const orCriteria = new OrCriteria(new CategoryCriteria('Electronics'), new OnSaleCriteria());

      const result = orCriteria.matching(products);

      // Deve incluir Electronics OU em promoção
      expect(result).toHaveLength(3);
    });
  });
});
