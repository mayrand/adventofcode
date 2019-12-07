using System;
using System.Linq;

namespace _1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(System.IO.File.ReadAllLines("input").Select(v => int.Parse(v)).Sum(x => x / 3 - 2));
        }
    }
}
