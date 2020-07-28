<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for($c = 1 ; $c <= 5 ; $c++){

            $category = new Category();
            $category->setTitle($faker->sentence(3));

            $manager->persist($category);

            $maximum = mt_rand(10,30);

            for($p = 0 ; $p < $maximum ; $p++){

                $product = new Product();
                $product->setTitle($faker->sentence(5))
                        ->setPrice($faker->randomFloat(2,30 , 100 ))
                        ->setDescription($faker->paragraph(5))
                        ->setCategory($category);

                $manager->persist($product);

            }


        }

        $manager->flush();
    }
}
