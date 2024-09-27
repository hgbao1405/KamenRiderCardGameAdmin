using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KamenRiderCardGame.Migrations
{
    /// <inheritdoc />
    public partial class updatecharacterseeding : Migration
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

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Character",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTime",
                table: "Character",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Character",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedTime",
                table: "Character",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Character",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedTime",
                table: "Character",
                type: "datetime2",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Character",
                columns: new[] { "Id", "Attack", "Avatar", "CreatedTime", "Deleted", "DeletedTime", "Description", "Health", "Name", "UpdatedTime" },
                values: new object[,]
                {
                    { 1, 10, "OOO.png", null, false, null, null, 100, "OOO", null },
                    { 2, 10, "Ex-Aid.png", null, false, null, null, 100, "Ex-Aid", null },
                    { 3, 10, "Gavv.png", null, false, null, null, 100, "Gavv", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Character",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Character");

            migrationBuilder.DropColumn(
                name: "CreatedTime",
                table: "Character");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Character");

            migrationBuilder.DropColumn(
                name: "DeletedTime",
                table: "Character");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Character");

            migrationBuilder.DropColumn(
                name: "UpdatedTime",
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
        }
    }
}
