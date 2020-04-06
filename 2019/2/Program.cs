using System;
using System.Linq;
using System.IO;
namespace _2
{
    class Program
    {
        static void Main(string[] args)
        {
            var data = File.ReadAllText("input").Split(',').Select(int.Parse).ToArray();
            IntCode(ref data);
            Console.WriteLine(string.Join(", ", data));
        }

        static void IntCode(ref int[] data)
        {
            int x, y, z;
            for (var i = 0; data[i] < 99; i += 4)
            {
                x = data[i + 1];
                y = data[i + 2];
                z = data[i + 3];
                switch (data[i])
                {
                    case 1:
                        data[z] = data[x] + data[y];
                        break;
                    case 2:
                        data[z] = data[x] * data[y];
                        break;
                    default:
                        throw new Exception("Unknown opcode");
                }
            }
            
        }
    }
}