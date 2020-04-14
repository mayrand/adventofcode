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
            int[] newSet = new int[data.Length];

            int[] BruteForceIntCode()
            {
                for (int noun = 0; noun < data.Length; noun++)
                {
                    for (int verb = 0; verb < data.Length; verb++)
                    {
                        data.CopyTo(newSet, 0);
                        newSet[1] = noun;
                        newSet[2] = verb;
                        IntCode(ref newSet);
                        if (newSet[0] == 19690720)
                            return newSet;
                    }
                }

                return null;
            }

            Console.WriteLine(string.Join(", ", BruteForceIntCode() ?? new[] {0, 0}));
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