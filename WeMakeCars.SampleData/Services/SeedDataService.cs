using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using WeMakeCars.Dal;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.SampleData.Services;

internal class SeedDataService(IHostApplicationLifetime lifetime, DataContext context) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await context.Database.MigrateAsync(cancellationToken);

        var truckCabin =  new Part {
            Name = "Three-seat Cabin",
            ObjModel = await GetModel("TruckCabin.obj", cancellationToken),
            PreviewUrl = "/images/TruckCabin.jpg",
            Sockets = [],
        };

        var truckFrontRim =  new Part {
            Name = "Heavy-duty Rim",
            ObjModel = await GetModel("TruckFrontRim.obj", cancellationToken),
            PreviewUrl = "/images/TruckFrontRim.jpg",
            Sockets = [],
        };

        var truckBackRim =  new Part {
            Name = "Double Heavy-duty Rims",
            ObjModel = await GetModel("TruckBackRim.obj", cancellationToken),
            PreviewUrl = "/images/TruckBackRim.jpg",
            Sockets = [],
        };

        var streetFrontRim =  new Part {
            Name = "Street Rim",
            ObjModel = await GetModel("StreetFrontRim.obj", cancellationToken),
            PreviewUrl = "/images/StreetFrontRim.jpg",
            Sockets = [],
        };

        var streetBackRim =  new Part {
            Name = "Wide Street Rim",
            ObjModel = await GetModel("StreetBackRim.obj", cancellationToken),
            PreviewUrl = "/images/StreetBackRim.jpg",
            Sockets = [],
        };

        await context.Sockets.AddRangeAsync(
            new Socket() {
                Name = "Frame",
                Level = 0,
                Parts = [
                    new() {
                        Name = "Long Truck",
                        ObjModel = await GetModel("LongTruckFrame.obj", cancellationToken),
                        PreviewUrl = "/images/LongTruckFrame.jpg",
                        Sockets = [
                            new() {
                                Name = "Front Rims",
                                Level = 1,
                                Parts = [
                                    truckFrontRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.778705f, Y = -2.02296f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.783041f, Y = -2.02296f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Back Rims",
                                Level = 1,
                                Parts = [
                                    truckBackRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.670001f, Y = 0.913997f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.673645f, Y = 0.913997f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = 0.670001f, Y = 2.03641f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.673645f, Y = 2.03641f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Cabin",
                                Level = 1,
                                Parts = [
                                    truckCabin
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0, Y = -2.16972f, Z = 0.845125f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    new() {
                        Name = "Short Truck",
                        ObjModel = await GetModel("ShortTruckFrame.obj", cancellationToken),
                        PreviewUrl = "/images/ShortTruckFrame.jpg",
                        Sockets = [
                            new() {
                                Name = "Front Rims",
                                Level = 1,
                                Parts = [
                                    truckFrontRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.779045f, Y = -1.50425f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.780636f, Y = -1.50425f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Back Rims",
                                Level = 1,
                                Parts = [
                                    truckBackRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.670922f, Y = 1.42615f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.672597f, Y = 1.42615f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Cabin",
                                Level = 1,
                                Parts = [
                                    truckCabin
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.004022f, Y = -1.64351f, Z = 0.845125f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    new() {
                        Name = "Off-road",
                        ObjModel = await GetModel("OffRoadFrame.obj", cancellationToken),
                        PreviewUrl = "/images/OffRoadFrame.jpg",
                        Sockets = [
                            new() {
                                Name = "Rims",
                                Level = 1,
                                Parts = [
                                    truckFrontRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.665826f, Y = -1.51374f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.67825f, Y = -1.51374f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = 0.665826f, Y = 1.12944f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.67825f, Y = 1.12944f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Hood",
                                Level = 1,
                                Parts = [
                                    new() {
                                        Name = "Hood",
                                        ObjModel = await GetModel("OffRoadHood.obj", cancellationToken),
                                        PreviewUrl = "/images/OffRoadHood.jpg",
                                        Sockets = [],
                                    }
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = -0.000582f, Y = -1.51423f, Z = 0.607478f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Cabin",
                                Level = 1,
                                Parts = [
                                    new() {
                                        Name = "Cabin",
                                        ObjModel = await GetModel("OffRoadCabin.obj", cancellationToken),
                                        PreviewUrl = "/images/OffRoadCabin.jpg",
                                        Sockets = [],
                                    }
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0, Y = -0.515214f, Z = 0.607478f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Trunk",
                                Level = 1,
                                Parts = [
                                    new() {
                                        Name = "Open Trunk",
                                        ObjModel = await GetModel("OffRoadOpenTrunk.obj", cancellationToken),
                                        PreviewUrl = "/images/OffRoadOpenTrunk.jpg",
                                        Sockets = [],
                                    },
                                    new() {
                                        Name = "Closed Trunk",
                                        ObjModel = await GetModel("OffRoadClosedTrunk.obj", cancellationToken),
                                        PreviewUrl = "/images/OffRoadClosedTrunk.jpg",
                                        Sockets = [],
                                    },
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = -0.005669f, Y = 0.986816f, Z = 0.607478f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    new() {
                        Name = "Street",
                        ObjModel = await GetModel("StreetFrame.obj", cancellationToken),
                        PreviewUrl = "/images/StreetFrame.jpg",
                        Sockets = [
                            new() {
                                Name = "Front Rims",
                                Level = 1,
                                Parts = [
                                    streetFrontRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.674316f, Y = -1.04868f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.671975f, Y = -1.04868f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Back Rims",
                                Level = 1,
                                Parts = [
                                    streetBackRim
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0.674316f, Y = 1.35972f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    },
                                    new() {
                                        Position = new() {
                                            X = -0.671975f, Y = 1.35972f, Z = 0
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 180
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Hood",
                                Level = 1,
                                Parts = [
                                    new() {
                                        Name = "Hood",
                                        ObjModel = await GetModel("StreetHood.obj", cancellationToken),
                                        PreviewUrl = "/images/StreetHood.jpg",
                                        Sockets = [],
                                    }
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = 0, Y = -1.07205f, Z = 0.275559f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Cabin",
                                Level = 1,
                                Parts = [
                                    new() {
                                        Name = "Cabin",
                                        ObjModel = await GetModel("StreetCabin.obj", cancellationToken),
                                        PreviewUrl = "/images/StreetCabin.jpg",
                                        Sockets = [],
                                    }
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = -0.026367f, Y = 0.255876f, Z = 0.276215f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                            new() {
                                Name = "Trunk",
                                Level = 1,
                                Parts = [
                                    new() {
                                        Name = "Trunk",
                                        ObjModel = await GetModel("StreetTrunk.obj", cancellationToken),
                                        PreviewUrl = "/images/StreetTrunk.jpg",
                                        Sockets = [],
                                    }
                                ],
                                Transforms = [
                                    new() {
                                        Position = new() {
                                            X = -0.013054f, Y = 1.406f, Z = 0.276871f
                                        },
                                        Rotation = new() {
                                            X = 0, Y = 0, Z = 0
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                ],
                Transforms = [
                    new() {
                        Position = new() {
                            X = 0, Y = 0, Z = 0
                        },
                        Rotation = new() {
                            X = 0, Y = 0, Z = 0
                        }
                    },
                ],
            }
        );

        await context.SaveChangesAsync(cancellationToken);
        lifetime.StopApplication();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    private static Task<string> GetModel(string name, CancellationToken cancellationToken)
    {
        return File.ReadAllTextAsync(Path.Join("Models", name), cancellationToken);
    }
}
