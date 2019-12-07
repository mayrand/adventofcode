using System;
using System.Linq;

namespace _1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(System.IO.File.ReadAllLines("input")
            .Select(mass => int.Parse(mass))
            .Sum(x => FuelAmmount(x)));
            Console.WriteLine($"{FuelAmmount(1969)}");
        }

        static int FuelAmmount(int mass)
        {
            var fuel = mass / 3 - 2;
            if (fuel > 0)
                fuel += FuelAmmount(fuel);
            else
                return 0;
            return fuel;
        }
    }
}
