using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WeMakeCars.Dal.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parts",
                columns: table => new
                {
                    PartId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ObjModel = table.Column<string>(type: "text", nullable: false),
                    PreviewUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parts", x => x.PartId);
                });

            migrationBuilder.CreateTable(
                name: "Sockets",
                columns: table => new
                {
                    SocketId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sockets", x => x.SocketId);
                });

            migrationBuilder.CreateTable(
                name: "PartSocket",
                columns: table => new
                {
                    PartsPartId = table.Column<int>(type: "integer", nullable: false),
                    SocketsSocketId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartSocket", x => new { x.PartsPartId, x.SocketsSocketId });
                    table.ForeignKey(
                        name: "FK_PartSocket_Parts_PartsPartId",
                        column: x => x.PartsPartId,
                        principalTable: "Parts",
                        principalColumn: "PartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartSocket_Sockets_SocketsSocketId",
                        column: x => x.SocketsSocketId,
                        principalTable: "Sockets",
                        principalColumn: "SocketId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transforms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SocketId = table.Column<int>(type: "integer", nullable: true),
                    Position_X = table.Column<float>(type: "real", nullable: false),
                    Position_Y = table.Column<float>(type: "real", nullable: false),
                    Position_Z = table.Column<float>(type: "real", nullable: false),
                    Rotation_X = table.Column<float>(type: "real", nullable: false),
                    Rotation_Y = table.Column<float>(type: "real", nullable: false),
                    Rotation_Z = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transforms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transforms_Sockets_SocketId",
                        column: x => x.SocketId,
                        principalTable: "Sockets",
                        principalColumn: "SocketId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PartSocket_SocketsSocketId",
                table: "PartSocket",
                column: "SocketsSocketId");

            migrationBuilder.CreateIndex(
                name: "IX_Transforms_SocketId",
                table: "Transforms",
                column: "SocketId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PartSocket");

            migrationBuilder.DropTable(
                name: "Transforms");

            migrationBuilder.DropTable(
                name: "Parts");

            migrationBuilder.DropTable(
                name: "Sockets");
        }
    }
}
