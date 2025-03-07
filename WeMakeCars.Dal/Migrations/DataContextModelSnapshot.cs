﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WeMakeCars.Dal;

#nullable disable

namespace WeMakeCars.Dal.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PartSocket", b =>
                {
                    b.Property<int>("PartsPartId")
                        .HasColumnType("integer");

                    b.Property<int>("SocketsSocketId")
                        .HasColumnType("integer");

                    b.HasKey("PartsPartId", "SocketsSocketId");

                    b.HasIndex("SocketsSocketId");

                    b.ToTable("PartSocket");
                });

            modelBuilder.Entity("WeMakeCars.Dal.Models.Part", b =>
                {
                    b.Property<int>("PartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PartId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ObjModel")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PreviewUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("PartId");

                    b.ToTable("Parts");
                });

            modelBuilder.Entity("WeMakeCars.Dal.Models.Socket", b =>
                {
                    b.Property<int>("SocketId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SocketId"));

                    b.Property<int>("Level")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SocketId");

                    b.ToTable("Sockets");
                });

            modelBuilder.Entity("WeMakeCars.Dal.Models.Transform", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("SocketId")
                        .HasColumnType("integer");

                    b.ComplexProperty<Dictionary<string, object>>("Position", "WeMakeCars.Dal.Models.Transform.Position#Position", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<float>("X")
                                .HasColumnType("real");

                            b1.Property<float>("Y")
                                .HasColumnType("real");

                            b1.Property<float>("Z")
                                .HasColumnType("real");
                        });

                    b.ComplexProperty<Dictionary<string, object>>("Rotation", "WeMakeCars.Dal.Models.Transform.Rotation#EulerAngles", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<float>("X")
                                .HasColumnType("real");

                            b1.Property<float>("Y")
                                .HasColumnType("real");

                            b1.Property<float>("Z")
                                .HasColumnType("real");
                        });

                    b.HasKey("Id");

                    b.HasIndex("SocketId");

                    b.ToTable("Transforms");
                });

            modelBuilder.Entity("PartSocket", b =>
                {
                    b.HasOne("WeMakeCars.Dal.Models.Part", null)
                        .WithMany()
                        .HasForeignKey("PartsPartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WeMakeCars.Dal.Models.Socket", null)
                        .WithMany()
                        .HasForeignKey("SocketsSocketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WeMakeCars.Dal.Models.Transform", b =>
                {
                    b.HasOne("WeMakeCars.Dal.Models.Socket", null)
                        .WithMany("Transforms")
                        .HasForeignKey("SocketId");
                });

            modelBuilder.Entity("WeMakeCars.Dal.Models.Socket", b =>
                {
                    b.Navigation("Transforms");
                });
#pragma warning restore 612, 618
        }
    }
}
