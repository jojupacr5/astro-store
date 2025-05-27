import { Role, User, db, Product, ProductImage } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
	const roles = [
		{ id: 'admin', name: 'Administrador' },
		{ id: 'user', name: 'Usuario del sistema' },
	];

	const johnDoe = {
		id: UUID(),
		name: 'John Doe',
		email: 'john.doe@google.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin',
	};

	const janeDoe = {
		id: UUID(),
		name: 'Jane Doe',
		email: 'jane.doe@google.com',
		password: bcrypt.hashSync('123456'),
		role: 'user',
	};

	await db.insert(Role).values(roles);
	await db.insert(User).values([johnDoe, janeDoe]);

	const queries: any = [];
	seedProducts.forEach((p) => {
		const product = {
			id: UUID(),
			stock: p.stock,
			slug: p.slug,
			price: p.price,
			sizes: p.sizes.join(','),
			type: p.type,
			tags: p.tags.join(','),
			title: p.title,
			description: p.description,
			gender: p.gender,
			user: johnDoe.id,
		}

		queries.push(db.insert(Product).values(product));

		p.images.forEach((img) => {
			const image = {
				id: UUID(),
				image: img,
				productId: product.id,
			}

			queries.push(db.insert(ProductImage).values(image));
		});

	});

	await db.batch(queries);
}
