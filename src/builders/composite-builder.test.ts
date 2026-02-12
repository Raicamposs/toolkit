import { describe, expect, it } from 'vitest';
import { CompositeBuilder } from './composite-builder';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  role: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

describe('CompositeBuilder', () => {
  describe('Método new', () => {
    it('deve criar uma nova instância do CompositeBuilder', () => {
      const builder = CompositeBuilder.new<User>();

      expect(builder).toBeInstanceOf(CompositeBuilder);
    });

    it('deve criar builders independentes', () => {
      const builder1 = CompositeBuilder.new<User>();
      const builder2 = CompositeBuilder.new<User>();

      expect(builder1).not.toBe(builder2);
    });
  });

  describe('Método add', () => {
    it('deve retornar uma nova instância com o builder adicionado', () => {
      const builder = CompositeBuilder.new<User>();
      const setName = (user: User) => ({ ...user, name: 'John' });

      const newBuilder = builder.add(setName);

      expect(newBuilder).not.toBe(builder);
      expect(newBuilder).toBeInstanceOf(CompositeBuilder);
    });

    it('deve permitir adicionar múltiplos builders via encadeamento', () => {
      const setName = (user: User) => ({ ...user, name: 'John' });
      const setAge = (user: User) => ({ ...user, age: 30 });

      const builder = CompositeBuilder.new<User>().add(setName).add(setAge);

      const initialUser: User = {
        id: 1,
        name: '',
        email: '',
        age: 0,
        isActive: false,
        role: '',
      };

      const result = builder.build(initialUser);

      expect(result.name).toBe('John');
      expect(result.age).toBe(30);
    });
  });

  describe('Método build', () => {
    it('deve retornar o objeto original quando nenhum builder foi adicionado', () => {
      const builder = CompositeBuilder.new<User>();
      const initialUser: User = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = builder.build(initialUser);

      expect(result).toEqual(initialUser);
    });

    it('deve aplicar um único builder', () => {
      const builder = CompositeBuilder.new<User>();
      const setName = (user: User) => ({ ...user, name: 'Jane' });

      const newBuilder = builder.add(setName);

      const initialUser: User = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = newBuilder.build(initialUser);

      expect(result.name).toBe('Jane');
      expect(result.email).toBe('john@example.com');
    });

    it('deve aplicar múltiplos builders em sequência', () => {
      const setName = (user: User) => ({ ...user, name: 'Alice' });
      const setAge = (user: User) => ({ ...user, age: 25 });
      const setRole = (user: User) => ({ ...user, role: 'admin' });

      const builder = CompositeBuilder.new<User>()
        .add(setName)
        .add(setAge)
        .add(setRole);

      const initialUser: User = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = builder.build(initialUser);

      expect(result).toEqual({
        id: 1,
        name: 'Alice',
        email: 'john@example.com',
        age: 25,
        isActive: true,
        role: 'admin',
      });
    });

    it('deve aplicar builders na ordem em que foram adicionados', () => {
      const setName1 = (user: User) => ({ ...user, name: 'First' });
      const setName2 = (user: User) => ({ ...user, name: 'Second' });
      const setName3 = (user: User) => ({ ...user, name: 'Final' });

      const builder = CompositeBuilder.new<User>()
        .add(setName1)
        .add(setName2)
        .add(setName3);

      const initialUser: User = {
        id: 1,
        name: 'Original',
        email: 'test@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = builder.build(initialUser);

      expect(result.name).toBe('Final');
    });

    it('deve permitir builders que modificam múltiplas propriedades', () => {
      const builder = CompositeBuilder.new<User>();
      const setAdminUser = (user: User) => ({
        ...user,
        role: 'admin',
        isActive: true,
        name: 'Admin User',
      });

      const newBuilder = builder.add(setAdminUser);

      const initialUser: User = {
        id: 1,
        name: 'Regular User',
        email: 'user@example.com',
        age: 30,
        isActive: false,
        role: 'user',
      };

      const result = newBuilder.build(initialUser);

      expect(result.role).toBe('admin');
      expect(result.isActive).toBe(true);
      expect(result.name).toBe('Admin User');
    });

    it('deve preservar propriedades não modificadas', () => {
      const builder = CompositeBuilder.new<User>();
      const setName = (user: User) => ({ ...user, name: 'New Name' });

      const newBuilder = builder.add(setName);

      const initialUser: User = {
        id: 999,
        name: 'Old Name',
        email: 'unique@example.com',
        age: 42,
        isActive: false,
        role: 'guest',
      };

      const result = newBuilder.build(initialUser);

      expect(result.id).toBe(999);
      expect(result.email).toBe('unique@example.com');
      expect(result.age).toBe(42);
      expect(result.isActive).toBe(false);
      expect(result.role).toBe('guest');
      expect(result.name).toBe('New Name');
    });
  });

  describe('Reutilização do Builder', () => {
    it('deve permitir reutilizar o mesmo builder com diferentes dados iniciais', () => {
      const setActive = (user: User) => ({ ...user, isActive: true });
      const setRole = (user: User) => ({ ...user, role: 'premium' });

      const builder = CompositeBuilder.new<User>().add(setActive).add(setRole);

      const user1: User = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        age: 25,
        isActive: false,
        role: 'user',
      };

      const user2: User = {
        id: 2,
        name: 'User 2',
        email: 'user2@example.com',
        age: 30,
        isActive: false,
        role: 'user',
      };

      const result1 = builder.build(user1);
      const result2 = builder.build(user2);

      expect(result1.name).toBe('User 1');
      expect(result1.isActive).toBe(true);
      expect(result1.role).toBe('premium');

      expect(result2.name).toBe('User 2');
      expect(result2.isActive).toBe(true);
      expect(result2.role).toBe('premium');
    });

    it('deve criar novos objetos sem modificar o original', () => {
      const builder = CompositeBuilder.new<User>();
      const setName = (user: User) => ({ ...user, name: 'Modified' });

      const newBuilder = builder.add(setName);

      const original: User = {
        id: 1,
        name: 'Original',
        email: 'test@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = newBuilder.build(original);

      expect(original.name).toBe('Original'); // Original não modificado
      expect(result.name).toBe('Modified');
    });
  });

  describe('Casos de Uso Complexos', () => {
    it('deve funcionar com transformações condicionais', () => {
      const upgradeToAdmin = (user: User) => {
        if (user.age >= 21) {
          return { ...user, role: 'admin', isActive: true };
        }
        return user;
      };

      const builder = CompositeBuilder.new<User>().add(upgradeToAdmin);

      const youngUser: User = {
        id: 1,
        name: 'Young User',
        email: 'young@example.com',
        age: 18,
        isActive: false,
        role: 'user',
      };

      const adultUser: User = {
        id: 2,
        name: 'Adult User',
        email: 'adult@example.com',
        age: 25,
        isActive: false,
        role: 'user',
      };

      const result1 = builder.build(youngUser);
      const result2 = builder.build(adultUser);

      expect(result1.role).toBe('user'); // Não modificado
      expect(result2.role).toBe('admin'); // Modificado
    });

    it('deve funcionar com Products', () => {
      const applyDiscount = (product: Product) => ({
        ...product,
        price: product.price * 0.9, // 10% desconto
      });

      const markInStock = (product: Product) => ({
        ...product,
        inStock: true,
      });

      const builder = CompositeBuilder.new<Product>()
        .add(applyDiscount)
        .add(markInStock);

      const product: Product = {
        id: 1,
        name: 'Laptop',
        price: 1000,
        category: 'Electronics',
        inStock: false,
      };

      const result = builder.build(product);

      expect(result.price).toBe(900);
      expect(result.inStock).toBe(true);
    });

    it('deve permitir composição de transformações complexas', () => {
      const normalizeEmail = (user: User) => ({
        ...user,
        email: user.email.toLowerCase().trim(),
      });

      const setDefaultRole = (user: User) => ({
        ...user,
        role: user.role || 'guest',
      });

      const activateUser = (user: User) => ({
        ...user,
        isActive: true,
      });

      const builder = CompositeBuilder.new<User>()
        .add(normalizeEmail)
        .add(setDefaultRole)
        .add(activateUser);

      const user: User = {
        id: 1,
        name: 'Test User',
        email: '  TEST@EXAMPLE.COM  ',
        age: 30,
        isActive: false,
        role: '',
      };

      const result = builder.build(user);

      expect(result.email).toBe('test@example.com');
      expect(result.role).toBe('guest');
      expect(result.isActive).toBe(true);
    });
  });

  describe('Padrões de Design', () => {
    it('deve funcionar como pipeline de transformações', () => {
      const step1 = (user: User) => ({ ...user, name: user.name.toUpperCase() });
      const step2 = (user: User) => ({ ...user, email: user.email.toLowerCase() });
      const step3 = (user: User) => ({ ...user, age: user.age + 1 });

      const builder = CompositeBuilder.new<User>()
        .add(step1)
        .add(step2)
        .add(step3);

      const user: User = {
        id: 1,
        name: 'john doe',
        email: 'JOHN@EXAMPLE.COM',
        age: 29,
        isActive: true,
        role: 'user',
      };

      const result = builder.build(user);

      expect(result.name).toBe('JOHN DOE');
      expect(result.email).toBe('john@example.com');
      expect(result.age).toBe(30);
    });

    it('deve permitir criar builders reutilizáveis', () => {
      // Builder para ativar usuários
      const activateUserBuilder = CompositeBuilder.new<User>().add((user) => ({
        ...user,
        isActive: true,
      }));

      // Builder para tornar admin
      const makeAdminBuilder = CompositeBuilder.new<User>()
        .add((user) => ({ ...user, role: 'admin' }))
        .add((user) => ({ ...user, isActive: true }));

      const user: User = {
        id: 1,
        name: 'User',
        email: 'user@example.com',
        age: 30,
        isActive: false,
        role: 'user',
      };

      const activeUser = activateUserBuilder.build(user);
      const adminUser = makeAdminBuilder.build(user);

      expect(activeUser.isActive).toBe(true);
      expect(activeUser.role).toBe('user');

      expect(adminUser.isActive).toBe(true);
      expect(adminUser.role).toBe('admin');
    });
  });

  describe('Edge Cases', () => {
    it('deve lidar com builders que retornam o mesmo objeto', () => {
      const builder = CompositeBuilder.new<User>();
      const noOp = (user: User) => user;

      const newBuilder = builder.add(noOp);

      const user: User = {
        id: 1,
        name: 'User',
        email: 'user@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = newBuilder.build(user);

      expect(result).toEqual(user);
    });

    it('deve lidar com valores falsy', () => {
      const setAge = (user: User) => ({ ...user, age: 0 });
      const setName = (user: User) => ({ ...user, name: '' });

      const builder = CompositeBuilder.new<User>().add(setAge).add(setName);

      const user: User = {
        id: 1,
        name: 'User',
        email: 'user@example.com',
        age: 30,
        isActive: true,
        role: 'user',
      };

      const result = builder.build(user);

      expect(result.age).toBe(0);
      expect(result.name).toBe('');
    });

    it('deve lidar com objetos vazios', () => {
      interface EmptyObject { }

      const builder = CompositeBuilder.new<EmptyObject>();
      const result = builder.build({});

      expect(result).toEqual({});
    });
  });
});
