const std = @import("std");

pub fn main() !void {
    const input = @embedFile("./input.txt");
    std.debug.print("{}\n", .{try part1(input)});
}

fn part1(text: []const u8) !u64 {
    var iter = std.mem.split(u8, text, "\n");

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list_1 = std.ArrayList(u64).init(allocator);
    defer list_1.deinit();

    var hash = std.AutoHashMap(u64, u64).init(allocator);
    defer hash.deinit();
    var diff = std.ArrayList(u64).init(allocator);
    defer diff.deinit();

    while (iter.next()) |line| {
        var list_entries = std.mem.tokenize(u8, line, " ");

        var count: u64 = 0;
        while (list_entries.next()) |item| {
            if (count == 0) {
                const num = try std.fmt.parseInt(u64, item, 10);
                try list_1.append(num);
            } else if (count == 1) {
                const num = try std.fmt.parseInt(u64, item, 10);
                const current = hash.get(num);
                if (current) |v| {
                    try hash.put(num, v + 1);
                } else {
                    try hash.put(num, 1);
                }
            }
            count += 1;
        }
    }
    for (list_1.items) |item| {
        const val = hash.get(item);
        if (val) |v| {
            try diff.append(item * v);
        }
    }
    var sum: u64 = 0;
    for (diff.items) |item| {
        sum += item;
    }
    return sum;
}

test "day-02-example-1" {
    const input = @embedFile("./test-1.txt");

    const result = try part1(input);
    try std.testing.expectEqual(31, result);
}
