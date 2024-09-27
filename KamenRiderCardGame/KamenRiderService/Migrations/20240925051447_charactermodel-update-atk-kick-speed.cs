using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KamenRiderCardGame.Migrations
{
    /// <inheritdoc />
    public partial class charactermodelupdateatkkickspeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Character",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Kick",
                table: "Character",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Speed",
                table: "Character",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Avatar", "Kick", "Speed" },
                values: new object[] { "images/OOO.png", 10, 10 });

            migrationBuilder.UpdateData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Avatar", "Kick", "Speed" },
                values: new object[] { "images/Ex-Aid.png", 10, 10 });

            migrationBuilder.UpdateData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Avatar", "Kick", "Speed" },
                values: new object[] { "images/Gavv.png", 10, 10 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Kick",
                table: "Character");

            migrationBuilder.DropColumn(
                name: "Speed",
                table: "Character");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Character",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 1,
                column: "Avatar",
                value: "OOO.png");

            migrationBuilder.UpdateData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 2,
                column: "Avatar",
                value: "Ex-Aid.png");

            migrationBuilder.UpdateData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 3,
                column: "Avatar",
                value: "Gavv.png");
        }
    }
}
