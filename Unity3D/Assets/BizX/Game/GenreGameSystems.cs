using System;
using UnityEngine;

namespace BizX.Game {
    [Serializable] public class VehicleState { public float Speed, Grip = 1f, Fuel = 100f, Durability = 100f, Heat; }
    [Serializable] public class FighterState { public int Health = 100, Frame, Combo; public float Stamina = 100f, Meter; }

    public sealed class GenreGameSystems : MonoBehaviour {
        public VehicleState Vehicle = new();
        public FighterState Fighter = new();
        public int Wanted;

        public void Drive(float throttle, float brake, float steering, float dt = 1f / 60f) {
            throttle = Mathf.Clamp01(throttle); brake = Mathf.Clamp01(brake);
            Vehicle.Speed = Mathf.Max(0f, Vehicle.Speed + (throttle * 18f - brake * 28f) * dt);
            Vehicle.Speed *= Mathf.Max(0f, 1f - Mathf.Abs(steering) * (1f - Vehicle.Grip) * dt);
            Vehicle.Fuel = Mathf.Max(0f, Vehicle.Fuel - throttle * .02f);
        }

        public void SetWanted(int delta) => Wanted = Mathf.Clamp(Wanted + delta, 0, 5);

        public int Attack(string action, bool blocked = false) {
            Fighter.Frame++;
            int damage = action switch { "light" => 6, "heavy" => 12, "special" => 20, _ => 0 };
            if (damage > 0) Fighter.Meter = Mathf.Min(100f, Fighter.Meter + damage * .5f);
            int finalDamage = blocked ? Mathf.Max(1, damage / 4) : damage;
            Fighter.Health = Mathf.Max(0, Fighter.Health - finalDamage);
            Fighter.Combo = blocked ? 0 : Fighter.Combo + (damage > 0 ? 1 : 0);
            return finalDamage;
        }
    }
}
